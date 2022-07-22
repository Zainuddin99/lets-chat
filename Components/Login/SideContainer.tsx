import classes from "./Login.module.scss";
import { SyntheticEvent, useEffect, useState } from "react";
import { isObjectsEqual, validateEmail } from "../../utils/functions";
import { createUser, signInUser } from "../../Firebase/auth";
import { notify } from "../../utils/notify";
import { FormType, Inputs } from "../../TS Types/login.types";
import { useInputs } from "../../customHooks/useInputs";
import { useRouter } from "next/router";

const initialInputs = { password: "", email: "", confirmPassword: '', firstName: '', lastName: '' };

function SideContainer() {
    const [formType, setFormType] = useState<FormType>("login");
    const [inputs, handleInputsChange, setInputs] = useInputs(initialInputs);
    const [disabledSubmit, setDisabledSubmit] = useState<boolean>(true);
    const [showSignupMessage, setShowSignupMessage] = useState<boolean>(false);

    const router = useRouter()

    //To add default inputs when inputs have changed
    const defaultInputs = () => {
        if (!isObjectsEqual(initialInputs, inputs)) {
            setInputs(initialInputs);
        }
    };

    useEffect(() => {
        defaultInputs();
    }, [formType]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showSignupMessage) {
            timer = setTimeout(() => {
                setShowSignupMessage(false);
            }, 6000);
        }

        return () => clearTimeout(timer);
    }, [showSignupMessage]);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const { email, password, confirmPassword, firstName, lastName }: Inputs = inputs;
        setDisabledSubmit(true);
        try {
            if (formType === "signup") {
                if (password !== confirmPassword) return
                await createUser(email, password, firstName, lastName);
                notify("success", "Signed up successfully");
                setFormType("login");
                setShowSignupMessage(true);
                defaultInputs();
            } else {
                await signInUser(email, password);
                notify("success", "Successfully logged in");
                defaultInputs();
                router.push('/home')
            }
        } catch (error: any) {
            console.log(error)
            notify("danger", error.code);
        }
        setDisabledSubmit(false);
    };

    useEffect(() => {
        const validateForm = (): void => {
            const { email, password, confirmPassword, firstName, lastName } = inputs;
            if (
                email && validateEmail(email) && password &&
                //If the page is signup add addintional check
                (formType === "signup" ? (password === confirmPassword && firstName && lastName) : true)
            ) {
                setDisabledSubmit(false);
            } else {
                setDisabledSubmit(true);
            }
        };
        validateForm();
    }, [inputs, formType]);

    const toggleFormType = (type: FormType) => {
        setFormType(type);
    };

    return (
        <div className={`${classes.sideContainer} ${classes[formType]}`}>
            <div className={classes.container}>
                <div className={classes.heading}>
                    {formType === "login" ? "LOGIN" : "SIGN UP"}
                </div>

                <form className={"flex-c-u-c"} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        onChange={handleInputsChange}
                        name="email"
                        required
                        value={inputs.email}
                        className={`primary`}
                        autoComplete="off"
                        placeholder="Email *"
                    />
                    <input
                        type="password"
                        onChange={handleInputsChange}
                        value={inputs.password}
                        required
                        name="password"
                        className={`primary`}
                        placeholder="Password *"
                    />
                    {
                        formType === "signup" && (<>
                            <input
                                type="password"
                                onChange={handleInputsChange}
                                value={inputs.confirmPassword}
                                required
                                name="confirmPassword"
                                className={`primary`}
                                placeholder="Confirm password *"
                            />
                            <input
                                type="text"
                                onChange={handleInputsChange}
                                value={inputs.firstName}
                                required
                                name="firstName"
                                className={`primary`}
                                placeholder="First Name *"
                            />
                            <input
                                type="text"
                                onChange={handleInputsChange}
                                value={inputs.lastName}
                                required
                                name="lastName"
                                className={`primary`}
                                placeholder="Last Name *"
                            />
                        </>)
                    }
                    <button disabled={disabledSubmit}>Submit</button>
                    {formType === "login" && (
                        <div className={classes.forgotPassword}>
                            Forgot password?
                        </div>
                    )}
                </form>
                {showSignupMessage && (
                    <div className={classes.signupMessage}>
                        Signed up successfully...Login now
                    </div>
                )}
            </div>
            <div className={`${classes.signUpContainer} ${classes.container}`}>
                {formType === "login" ? (
                    <>
                        Dont have an account?{" "}
                        <span onClick={() => toggleFormType("signup")}>
                            Sign up
                        </span>
                    </>
                ) : (
                    <>
                        Back to{" "}
                        <span onClick={() => toggleFormType("login")}>
                            Login
                        </span>
                    </>
                )}
            </div>
        </div>
    );
}

export default SideContainer;
