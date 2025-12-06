import Input from "@/components/input";
import React from "react";
import Button from "@/components/button";

type FormChild = {
    title: string;
    type: string;
    placeholder: string;
}

type FormConfig = {
    className?: string;
    children: FormChild[];
    buttonText: string;
}

type HeadlessFormProps = {
    config: FormConfig;
    onSubmit: () => void;
};

export const HeadlessForm : React.FC<HeadlessFormProps> = ({config, onSubmit}) => {
    return (
        <div>
            <form className="flex flex-col">
                {config.children.map((child : FormChild, index : number) => (
                    <Input
                        key={index}
                        title={child.title}
                        type={child.type}
                        placeholder={child.placeholder}
                    />
                ))}
            </form>
            <Button text={config.buttonText} onClick={onSubmit} style={"w-full"}/>
        </div>
    )
}