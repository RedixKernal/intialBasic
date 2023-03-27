import React, { useContext, useEffect, useState } from "react";
// import DynamicForm from '../DynamicForm';
import * as Yup from "yup";
import { useLocation } from "react-router";
import {
  getPersonalDetails,
  postPersonalDetails,
  resetPersonalDetailsData,
} from "redux/api/SocialSummary/MSP/PersonalDetail";
import { useDispatch, useSelector } from "react-redux";
import ReusableStepper from "routes/Pages/DynamicForm/Stepper";
import { Formik } from "formik";
import GridContainer from "@wellfund/components/GridContainer";
import {
  TextField,
  Grid,
  Checkbox,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { FormHelperText } from "@material-ui/core";
import { getIn } from "formik";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import DatePickerComponent from "../DynamicForm/DatePicker";
import DropDownComponent from "../DynamicForm/DropDown";
import MaskedInput from "react-text-mask";
import moment from "moment";
import PropTypes from "prop-types";
import { getFormattedDate } from "@wellfund/utils/dateHelper";
import { hideErrorMessage } from "redux/actions";
import { toast, ToastContainer } from "react-toastify";
import PageLoader from "@wellfund/components/PageComponents/PageLoader";
import formatSsnNumber from "@wellfund/utils/SsnFormat";

import { SsnMaskCustom } from "@wellfund/utils/SsnMaskCustom";
import endOfDay from "date-fns/endOfDay";
import AppContext from "@wellfund/components/contextProvider/AppContextProvider/AppContext";

// !GQL Data Imports :
import { compose } from "react-apollo"; //!GQL Data
import { graphqlMutation } from "aws-appsync-react"; //!GQL Data
import { POST_MSP_PAGENAME } from "./GQl"; //!GQL Data
const { REACT_APP_OFFLINE_ENDPOINT } = process.env; //!GQL Data

const useStyles = makeStyles((theme) => ({
  button: {
    marginBottom: "5px",
    marginTop: "18px",
  },

  gridBox: {
    marginTop: "15px",
    marginBottom: "15px",
  },
  persondetailsFont: {
    "& .MuiTypography-body1": {
      [theme.breakpoints.down("md")]: {
        fontSize: "12px !important",
      },
    },
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        "(",
        /[1-9]/,
        /\d/,
        /\d/,
        ")",
        " ",
        /\d/,
        /\d/,
        /\d/,
        "-",
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={"\uFF3F"}
      showMask
      keepCharPositions={true}
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

const PersonalDetail = ({
  activeStep,
  steps,
  handleNext,
  handleBack,
  client, //!GQL Data
}) => {
  const { typeCodesData } = useContext(AppContext);
  const fields = [
    {
      fieldSizeMd: 4,
      fieldSizeSm: 6,
      tag: "datepicker",
      name: "birthdate",
      label: "Date of Birth",
      required: true,
    },
    {
      fieldSizeMd: 4,
      fieldSizeSm: 6,
      label: "Social Security Number",
      name: "socialSecurityNumber",
      type: "ssnNum",
      //required: true,
      //type: 'number',
    },
    {
      fieldSizeMd: 4,
      fieldSizeSm: 6,
      label: "Highest Grade Completed",
      name: "highestGrade",
      type: "text",
      required: true,
    },
    {
      fieldSizeMd: 4,
      fieldSizeSm: 6,
      label: "Marital Status",
      name: "maritalStatus",
      required: true,
      tag: "dropdown",
      options: typeCodesData?.MARITAL_STATUS,
    },
    {
      fieldSizeMd: 4,
      fieldSizeSm: 6,
      label: "Tax Filing Status",
      name: "taxFillingStatus",
      tag: "dropdown",
      required: true,
      options: typeCodesData?.TAX_FILLING_STATUS,
    },
    {
      fieldSizeMd: 4,
      fieldSizeSm: 6,
      tag: "radio",
      label: ["Yes", "No"],
      name: "isDependent",
      heading: "Are you claimed as a dependent?",
    },

    {
      fieldSizeMd: 4,
      fieldSizeSm: 6,
      label: "If joint, Name of filing partner",
      name: "fillingPartnerName",
      //required: true,
      type: "text",
      fieldSizeLg: 8,
    },
    {
      fieldSizeMd: 4,
      fieldSizeSm: 6,
      tag: "radio",
      label: ["Yes", "No"],
      name: "isOutsideDependent",
      heading: "Any dependents outside of the household?",
    },
    {
      label:
        "If claiming dependent under 19, please list insurance type if covered?",
      name: "checkPartnerUnder19",
      type: "text",
      fieldSizeLg: 8,
      fieldSizemd: 8,
    },
    {
      label: "Medicare Number",
      name: "medicareNo",
      type: "text",
    },
    // {
    //   fieldSizeMd: 1,
    //   fieldSizeSm: 1,
    //   tag: 'heading',

    //   headerText: 'Part A',
    // },
    {
      label: "Effective",
      name: "partA",

      tag: "checkbox",
      heading: "Part A",
      checkBoxType: "single",
    },
    {
      label: "Effective",
      name: "partB",
      tag: "checkbox",
      heading: "Part B",
      checkBoxType: "single",
    },
  ];
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    personalDetails,
    isFetching,
    isSuccess,
    isError,
    errorMessage,
    successMessage,
    statusCode,
  } = useSelector(({ personalDetails }) => personalDetails);
  const authToken = sessionStorage.getItem("token"); //!GQL Data
  const [gqlSuccessMessage, setGqlSuccessMessage] = useState(""); //!GQL Data
  const [gqlErrorMessage, setGqlErrorMessage] = useState(""); //!GQL Data
  const classes = useStyles();
  // const { loading, statusCode, error, message } = useSelector(({ common }) => common);
  const { accountNumber } =
    (location && location.state && location.state) || {};
  const initialValues = {
    checkPartnerUnder19:
      personalDetails && personalDetails.checkPartnerUnder19
        ? personalDetails.checkPartnerUnder19
        : "",
    fillingPartnerName:
      personalDetails && personalDetails.fillingPartnerName
        ? personalDetails.fillingPartnerName
        : "",
    highestGrade:
      personalDetails && personalDetails.highestGrade
        ? personalDetails.highestGrade
        : "",
    socialSecurityNumber:
      personalDetails && personalDetails.socialSecurityNumber
        ? personalDetails.socialSecurityNumber
        : "",
    birthdate:
      personalDetails && personalDetails.birthdate
        ? personalDetails.birthdate
        : "",
    isDependent:
      personalDetails && personalDetails.isDependent
        ? personalDetails.isDependent
        : "",
    isOutsideDependent:
      personalDetails && personalDetails.isOutsideDependent
        ? personalDetails.isOutsideDependent
        : "",
    maritalStatus:
      personalDetails && personalDetails.maritalStatus
        ? personalDetails.maritalStatus
        : "none",
    taxFillingStatus:
      personalDetails && personalDetails.taxFillingStatus
        ? personalDetails.taxFillingStatus
        : "",
    medicareNo:
      personalDetails && personalDetails.medicareNo
        ? personalDetails.medicareNo
        : "",
    partA:
      personalDetails && personalDetails.partA ? personalDetails.partA : false,
    partB:
      personalDetails && personalDetails.partB ? personalDetails.partB : false,
  };
  useEffect(() => {
    accountNumber && dispatch(getPersonalDetails(accountNumber));
    return () => {
      dispatch(resetPersonalDetailsData());
    };
  }, [dispatch, accountNumber]);

  useEffect(() => {
    if ((statusCode && statusCode === 200) || gqlSuccessMessage) {
      //!GQL Data
      handleNext();
    }
    return () => {
      dispatch(hideErrorMessage());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusCode, gqlSuccessMessage]); //!GQL Data

  useEffect(() => {
    if (gqlErrorMessage) {
      //!GQL Data
      setTimeout(() => {
        setGqlErrorMessage(""); //!GQL Data
        // dispatch(hideErrorMessage());
      }, 200);
    }
    if (gqlSuccessMessage) {
      //!GQL Data
      setTimeout(() => {
        setGqlSuccessMessage(""); //!GQL Data
        // dispatch(hideErrorMessage());
      }, 200);
    }
  }, [gqlSuccessMessage, gqlErrorMessage, dispatch]); //!GQL Data

  const ssnRegex = new RegExp(
    "^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$"
  );
  const schema = Yup.object().shape({
    // birthdate: Yup.string().required('Date of Birth  is required'),
    birthdate: Yup.date()
      .required("Date of Birth  is required")
      .max(endOfDay(new Date()), "Must be a date in the past")
      // deepcode ignore DateMonthIndex: <If we apply Snyk suggestion it is not showing when year is 1870>
      .min(
        moment(new Date(1870, 1, 1)).toDate(),
        "Date must be greater than 1870"
      )
      .nullable()
      .typeError("Please enter a valid date"),
    socialSecurityNumber: Yup.string()
      .test("ssnTest", "Enter a valid Social Security Number", (value) => {
        if (value) {
          let val = value.replace(
            /[\uFF3F\uFF3F\uFF3F-\uFF3F\uFF3F-\uFF3F\uFF3F\uFF3F\uFF3F]/g,
            ""
          );
          let val1 = val.replaceAll("-", "");
          if (val1.length === 0) {
            return true;
          } else {
            const formateValue = formatSsnNumber(value.replaceAll("-", ""));
            return ssnRegex.test(formateValue);
          }
        }
        return true;
      })

      .nullable(),
    isDependent: Yup.string().required("Please select one").nullable(),
    taxFillingStatus: Yup.string()
      .required("Tax Filing Status is required ")
      .nullable(),
    highestGrade: Yup.string()
      .required("Highest Grade Completed  is required ")
      .nullable(),
    isOutsideDependent: Yup.string().required("Please select one").nullable(),
    maritalStatus: Yup.mixed()
      .notOneOf(["none", ""], "Marital Status is required")
      .required("Marital Status is required"),
  });

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        enableReinitialize
        onSubmit={(values) => {
          const {
            checkPartnerUnder19,
            socialSecurityNumber,
            fillingPartnerName,
            highestGrade,
            isOutsideDependent,
            taxFillingStatus,
            birthdate,
            isDependent,
            maritalStatus,
            medicareNo,
            partA,
            partB,
          } = values;
          const data = {
            checkPartnerUnder19,
            fillingPartnerName,
            highestGrade,
            taxFillingStatus,
            isOutsideDependent,
            birthdate: birthdate ? getFormattedDate(birthdate) : null,
            isDependent,
            socialSecurityNumber: socialSecurityNumber.replaceAll("-", ""),
            maritalStatus,
            medicareNo,
            partA,
            partB,
            accountNumber,
            url: "/api/v1/social/msp/personalDetails/save",
            token: authToken,
            APIEndPoint: REACT_APP_OFFLINE_ENDPOINT,
          };
          //!GQL mutation
          client //!GQL Data
            .mutate({
              //!GQL Data
              mutation: POST_MSP_PAGENAME, //!GQL Data
              variavles: data, //!GQL Data
            }) //!GQL Data
            .then((res) => {
              //!GQL Data
              if (res?.data?.createMapPersonalDetails?.response !== null) {
                //!GQL Data
                setGqlSuccessMessage(
                  //!GQL Data
                  res?.data?.createMspPersonalDetails?.response.replace(
                    //!GQL Data
                    /['"]+/g,
                    ""
                  ) //!GQL Data
                );
              } else {
                //!GQL Data
                setGqlSuccessMessage(
                  //!GQL Data
                  res?.data?.createMspPersonalDetails?.displayMessage //!GQL Data
                );
              }
            }) //!GQL Data
            .catch((err) => {
              //!GQL Data
              console.log("Error : ", err); //!GQL Data
            });
          // dispatch(postPersonalDetails(data));
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <form
              autoComplete="on"
              noValidate
              // className="row"
              onSubmit={handleSubmit}
              style={{ padding: "30px" }}
            >
              <div>
                <div>
                  <div>
                    <div>
                      <GridContainer>
                        {fields.map((field) => {
                          const {
                            name,
                            label,
                            tag,
                            type,
                            required,
                            options,
                            heading,
                            fullWidth = true,
                            headerText,
                          } = field;
                          if (type === "text" || type === "currency") {
                            // if (
                            //   (values.reasonForNotHavingPhoneNo !== 'Other Reason' && name === 'otherReason') ||
                            //   (values.isPhoneNoAvailable === 'Yes' && name === 'otherReason')
                            // )
                            //   return null;
                            return (
                              <Grid
                                item
                                key={field.name}
                                xs={field.fieldSizeXs || 12}
                                sm={field.fieldSizeSm}
                                md={
                                  field.fieldSizeMd || field.fieldSizeSm || 12
                                }
                                lg={
                                  field.fieldSizeLg ||
                                  field.fieldSizeMd ||
                                  field.fieldSizeSm ||
                                  4
                                }
                              >
                                <div className="common-input-field">
                                  <TextField
                                    className="form-textfield form-textfield-label"
                                    placeholder={`${label}`}
                                    label={label}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    name={name}
                                    value={values[name]}
                                    required={required}
                                    onChange={handleChange}
                                    fullWidth={fullWidth}
                                    InputProps={{
                                      startAdornment: type === "currency" && (
                                        <InputAdornment position="start">
                                          $
                                        </InputAdornment>
                                      ),
                                    }}
                                    touched={touched[name]}
                                    error={touched[name] && errors[name]}
                                    helperText={
                                      touched[name] &&
                                      errors[name] &&
                                      errors[name]
                                    }
                                  />
                                </div>
                              </Grid>
                            );
                          } else if (
                            type === "phone" ||
                            type === "number" ||
                            type === "currency" ||
                            type === "zip" ||
                            type === "ssnNum"
                          ) {
                            if (
                              values.isPhoneNoAvailable === "No" &&
                              name === "phoneNo"
                            )
                              return null;

                            return (
                              <Grid
                                item
                                key={field.name}
                                xs={field.fieldSizeXs || 12}
                                sm={field.fieldSizeSm}
                                md={field.fieldSizeMd || field.fieldSizeSm || 6}
                                lg={
                                  field.fieldSizeLg ||
                                  field.fieldSizeMd ||
                                  field.fieldSizeSm ||
                                  4
                                }
                              >
                                <div className="common-input-field">
                                  <TextField
                                    className="form-textfield form-textfield-label"
                                    placeholder={`${label}`}
                                    label={label}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                    InputProps={{
                                      inputComponent:
                                        type === "phone"
                                          ? TextMaskCustom
                                          : type === "ssnNum"
                                          ? SsnMaskCustom
                                          : Number,
                                      startAdornment: type === "currency" && (
                                        <InputAdornment position="start">
                                          $
                                        </InputAdornment>
                                      ),
                                    }}
                                    inputProps={{
                                      maxLength: type === "zip" ? 5 : undefined,
                                    }}
                                    name={name}
                                    value={values[name]}
                                    // required={required || type === 'ssnNum' || type === 'zip' || false}
                                    required={required}
                                    onChange={handleChange}
                                    fullWidth={true}
                                    touched={touched[name]}
                                    error={touched[name] && errors[name]}
                                    helperText={
                                      touched[name] &&
                                      errors[name] &&
                                      errors[name]
                                    }
                                    //readOnly={readOnly}
                                    // disabled={disabled}
                                    // maxLength={maxLength}
                                  />
                                </div>
                              </Grid>
                            );
                          } else if (tag === "datepicker") {
                            return (
                              <Grid
                                item
                                key={field.name}
                                xs={field.fieldSizeXs || 12}
                                sm={field.fieldSizeSm}
                                md={field.fieldSizeMd || field.fieldSizeSm || 6}
                                lg={
                                  field.fieldSizeLg ||
                                  field.fieldSizeMd ||
                                  field.fieldSizeSm ||
                                  4
                                }
                              >
                                <div className="common-input-field">
                                  <div className="form-group">
                                    <DatePickerComponent
                                      label={label}
                                      name={name}
                                      value={values[name]}
                                      handleChange={handleChange}
                                      error={errors[name]}
                                      helperText={errors[name]}
                                      required={required}
                                    />
                                  </div>
                                </div>
                              </Grid>
                            );
                          } else if (tag === "dropdown") {
                            // if (values.isPhoneNoAvailable === 'Yes' && name === 'reasonForNotHavingPhoneNo') return null;
                            return (
                              <Grid
                                item
                                key={field.name}
                                xs={field.fieldSizeXs || 12}
                                sm={field.fieldSizeSm}
                                md={field.fieldSizeMd || field.fieldSizeSm || 6}
                                lg={
                                  field.fieldSizeLg ||
                                  field.fieldSizeMd ||
                                  field.fieldSizeSm ||
                                  4
                                }
                              >
                                <div className="common-input-field">
                                  <div className="form-group">
                                    <DropDownComponent
                                      label={field.label}
                                      name={field.name}
                                      value={values[field.name]}
                                      handleChange={handleChange}
                                      options={options}
                                      error={touched[name] && errors[name]}
                                      helperText={
                                        touched[name] &&
                                        errors[name] &&
                                        errors[name]
                                      }
                                      required={required}
                                    />
                                  </div>
                                </div>
                              </Grid>
                            );
                          } else if (tag === "radio") {
                            return (
                              <Grid
                                item
                                key={field.name}
                                xs={field.fieldSizeXs || 12}
                                sm={field.fieldSizeSm}
                                md={field.fieldSizeMd || field.fieldSizeSm || 6}
                                lg={
                                  field.fieldSizeLg ||
                                  field.fieldSizeMd ||
                                  field.fieldSizeSm ||
                                  4
                                }
                              >
                                <div
                                  className={`${classes.persondetailsFont} common-input-field`}
                                >
                                  <div className="form-group">
                                    <FormControl
                                      component="fieldset"
                                      error={errors[name]}
                                    >
                                      <FormLabel component="legend">
                                        {heading}{" "}
                                        {getIn(touched, [name]) &&
                                        getIn(errors, [name]) ? (
                                          <span
                                            style={{
                                              color: "red",
                                              fontSize: "14px",
                                            }}
                                          >{`*`}</span>
                                        ) : (
                                          "*"
                                        )}
                                      </FormLabel>

                                      <RadioGroup
                                        color="primary"
                                        row
                                        aria-label="wellfund-forms"
                                        name={name}
                                        value={values[name]}
                                        onChange={handleChange}
                                      >
                                        {label.map((item, i) => (
                                          <FormControlLabel
                                            key={i}
                                            value={item}
                                            control={
                                              <Radio
                                                color="primary"
                                                style={{ color: "#0166A4" }}
                                              />
                                            }
                                            label={item}
                                          />
                                        ))}
                                      </RadioGroup>
                                      <FormHelperText className="radioValidationText">
                                        <span>
                                          {touched[name] &&
                                            errors[name] &&
                                            errors[name]}
                                        </span>
                                      </FormHelperText>
                                    </FormControl>
                                  </div>
                                </div>
                              </Grid>
                            );
                          } else if (tag === "checkbox") {
                            return (
                              <Grid
                                item
                                key={field.name}
                                xs={field.fieldSizeXs || 6}
                                sm={field.fieldSizeSm}
                                md={field.fieldSizeMd || field.fieldSizeSm || 6}
                                lg={
                                  field.fieldSizeLg ||
                                  field.fieldSizeMd ||
                                  field.fieldSizeSm ||
                                  4
                                }
                              >
                                <div
                                  className={`${classes.persondetailsFont} common-input-field`}
                                >
                                  <FormLabel component="legend">
                                    {heading}{" "}
                                  </FormLabel>
                                  <FormControl
                                    fullWidth
                                    component="fieldset"
                                    margin="normal"
                                  >
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          onChange={handleChange}
                                          name={name}
                                          //  value={values[name]}
                                          checked={values[name]}
                                          label={label}
                                          color="primary"
                                          // style={{ marginRight: '', marginTop: '0px' }}
                                        />
                                      }
                                      label={label}
                                    />
                                  </FormControl>
                                </div>
                              </Grid>
                            );
                          } else if (tag === "heading") {
                            return (
                              <Grid
                                item
                                key={field.name}
                                xs={field.fieldSizeXs || 12}
                                sm={field.fieldSizeSm}
                                md={field.fieldSizeMd || field.fieldSizeSm || 2}
                                lg={
                                  field.fieldSizeLg ||
                                  field.fieldSizeMd ||
                                  field.fieldSizeSm ||
                                  2
                                }
                              >
                                <div className="mt-2">
                                  <p>{headerText}</p>
                                </div>
                              </Grid>
                            );
                          } else return null;
                        })}
                      </GridContainer>
                    </div>
                  </div>
                </div>
              </div>
              {steps && (
                <ReusableStepper
                  activeStep={activeStep}
                  handleBack={handleBack}
                  classes={classes}
                  steps={steps}
                  handleReset={handleReset}
                  handleSubmit={handleSubmit}
                  loading={isFetching}
                />
              )}
            </form>
          );
        }}
      </Formik>
      {isFetching && <PageLoader />}
      {gqlErrorMessage && toast.error(gqlErrorMessage)}//!GQL Data
      {gqlSuccessMessage && toast.success(gqlSuccessMessage)}//!GQL Data
      <ToastContainer />
    </React.Fragment>
  );
};

export default compose(graphqlMutation(POST_MSP_PAGENAME, "PersonalDetail"))(
  PersonalDetail //!GQL Data
);
