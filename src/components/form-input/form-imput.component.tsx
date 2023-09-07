import { InputHTMLAttributes, FC } from 'react';
import isPropValid from '@emotion/is-prop-valid';
import { StyleSheetManager } from 'styled-components';
import { FormInputLabel, Input, Group } from "./form-input.styles";

type FormInputProps = { label: string} & InputHTMLAttributes<HTMLInputElement>;

const FormInput: FC<FormInputProps> = ({ label, ...otherProps }) => {
    return(
        <Group>
            <Input {...otherProps}/>
            {label && (
                <StyleSheetManager shouldForwardProp={isPropValid}>
                    <FormInputLabel shrink={Boolean(otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length)}> 
                        {label}
                    </FormInputLabel>
                </StyleSheetManager>
            )}    
        </Group>
    )
}

export default FormInput;