"use client"

import { useState, useRef, forwardRef } from "react"
import { IconEye, IconEyeClosed } from "justd-icons"
import { Button as ButtonPrimitive, TextField as TextFieldPrimitive } from "react-aria-components"
import type { InputProps, TextFieldProps as TextFieldPrimitiveProps } from "react-aria-components"
import type { FieldProps } from "./field"
import { Description, FieldGroup, Input, Label } from "./field"
import { Loader } from "./loader"
import { composeTailwindRenderProps } from "./primitive"

type InputType = Exclude<InputProps["type"], "password">

interface BaseTextFieldProps extends TextFieldPrimitiveProps, FieldProps {
    prefix?: React.ReactNode
    suffix?: React.ReactNode
    isPending?: boolean
    className?: string
}

interface RevealableTextFieldProps extends BaseTextFieldProps {
    isRevealable: true
    type: "password"
}

interface NonRevealableTextFieldProps extends BaseTextFieldProps {
    isRevealable?: never
    type?: InputType
}

type TextFieldProps = RevealableTextFieldProps | NonRevealableTextFieldProps

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
    ({ placeholder, label, description, errorMessage, prefix, suffix, isPending, className, isRevealable, type, ...props }, ref) => {
        const [isPasswordVisible, setIsPasswordVisible] = useState(false)
        const inputRef = useRef<HTMLInputElement>(null)

        const inputType = isRevealable ? (isPasswordVisible ? "text" : "password") : type
        const handleTogglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev)

        return (
            <TextFieldPrimitive
                type={inputType}
                {...props}
                className={composeTailwindRenderProps(className, "group flex flex-col gap-y-1")}
            >
                {!props.children ? (
                    <>
                        {label && <Label>{label}</Label>}
                        <FieldGroup isDisabled={props.isDisabled} isInvalid={!!errorMessage} data-loading={isPending ? "true" : undefined}>
                            {prefix && typeof prefix === "string" ? <span className="ml-2 text-muted-fg">{prefix}</span> : prefix}
                            <Input ref={(el) => { inputRef.current = el; if (typeof ref === 'function') ref(el); }} placeholder={placeholder} />
                            {isRevealable ? (
                                <ButtonPrimitive
                                    type="button"
                                    aria-label="Toggle password visibility"
                                    onPress={handleTogglePasswordVisibility}
                                    className="relative mr-1 grid shrink-0 place-content-center rounded-sm border-transparent outline-hidden data-focus-visible:*:data-[slot=icon]:text-primary *:data-[slot=icon]:text-muted-fg"
                                >
                                    {isPasswordVisible ? <IconEyeClosed /> : <IconEye />}
                                </ButtonPrimitive>
                            ) : isPending ? (
                                <Loader variant="spin" />
                            ) : suffix ? (
                                typeof suffix === "string" ? <span className="mr-2 text-muted-fg">{suffix}</span> : suffix
                            ) : null}
                        </FieldGroup>
                        {description && <Description>{description}</Description>}

                    </>
                ) : (
                    props.children
                )}
            </TextFieldPrimitive>
        )
    }
)

TextField.displayName = "TextField"

export type { TextFieldProps }
export { TextField }
