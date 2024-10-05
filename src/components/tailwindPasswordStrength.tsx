import React, { useState } from "react";
import { CheckCircleIcon, EyeIcon, EyeSlashIcon, XCircleIcon } from "@heroicons/react/24/solid";

type PasswordCriteria = {
    minLength: number;
    hasUpperCase: boolean;
    hasSpecialChar: boolean;
};

type CriteriaMessages = {
    minLength: string;
    hasUpperCase: string;
    hasSpecialChar: string;
};

type PasswordStrengthProps = {
    register?: () => void;
    error?: boolean;
    passwordCriteria?: PasswordCriteria;
    criteriaMessages?: CriteriaMessages;
    placeholder?: string;
    strengthIndicator?: boolean;
    onChange?: (value: string) => void;
};

const tailwindPasswordStrength: React.FC<PasswordStrengthProps> = ({
    error = false,
    passwordCriteria = {
        minLength: 8,
        hasUpperCase: true,
        hasSpecialChar: true,
    },
    criteriaMessages = {
        minLength: "At least 8 characters in length.",
        hasUpperCase: "At least 1 uppercase letter.",
        hasSpecialChar: "At least 1 special character.",
    },
    placeholder = "Enter password",
    strengthIndicator = true,
    onChange,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState({
        isLengthValid: false,
        hasUpperCase: false,
        hasSpecialChar: false,
    });

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPassword(value);
        if (onChange) onChange(value);

        setIsValid({
            isLengthValid: value.length >= passwordCriteria.minLength,
            hasUpperCase: passwordCriteria.hasUpperCase ? /[A-Z]/.test(value) : true,
            hasSpecialChar: passwordCriteria.hasSpecialChar ? /[!@#$%^&*(),.?":{}|<>]/.test(value) : true,
        });
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="flex flex-col mb-2">
                <div className="relative flex items-center">
                    <input
                        type={isPasswordVisible ? "text" : "password"}
                        id="password"
                        className={`block w-full rounded-md border-0 px-4 py-1.5 shadow-sm ring-1 ring-inset ${error ? "ring-red-500" : "ring-gray-300"
                            } placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-dark`}
                        placeholder={placeholder}
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <button
                        type="button"
                        className="absolute right-3 text-gray-500 hover:text-gray-700"
                        onClick={togglePasswordVisibility}
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                    >
                        {isPasswordVisible ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                </div>

                {strengthIndicator && password && (
                    <div className="block p-4 mt-4 bg-gray-100 rounded-lg">
                        <h4 className="mb-2 text-sm font-semibold text-gray-800">Password Strength</h4>
                        <div className="flex mt-2">
                            {passwordCriteria.minLength > 0 && (
                                <div
                                    className={`h-2 flex-auto rounded-full bg-green-500 mx-1 ${isValid.isLengthValid ? "opacity-100" : "opacity-50"
                                        }`}
                                />
                            )}
                            {passwordCriteria.hasUpperCase && (
                                <div
                                    className={`h-2 flex-auto rounded-full bg-green-500 mx-1 ${isValid.hasUpperCase ? "opacity-100" : "opacity-50"
                                        }`}
                                />
                            )}
                            {passwordCriteria.hasSpecialChar && (
                                <div
                                    className={`h-2 flex-auto rounded-full bg-green-500 mx-1 ${isValid.hasSpecialChar ? "opacity-100" : "opacity-50"
                                        }`}
                                />
                            )}
                        </div>
                        <ul className="space-y-1 mt-2 text-sm text-gray-500">
                            {passwordCriteria.minLength > 0 && (
                                <li className="flex items-center gap-x-2">
                                    {isValid.isLengthValid ? (
                                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircleIcon className="h-4 w-4 text-red-500" />
                                    )}
                                    {criteriaMessages.minLength}
                                </li>
                            )}
                            {passwordCriteria.hasUpperCase && (
                                <li className="flex items-center gap-x-2">
                                    {isValid.hasUpperCase ? (
                                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircleIcon className="h-4 w-4 text-red-500" />
                                    )}
                                    {criteriaMessages.hasUpperCase}
                                </li>
                            )}
                            {passwordCriteria.hasSpecialChar && (
                                <li className="flex items-center gap-x-2">
                                    {isValid.hasSpecialChar ? (
                                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <XCircleIcon className="h-4 w-4 text-red-500" />
                                    )}
                                    {criteriaMessages.hasSpecialChar}
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default tailwindPasswordStrength;
