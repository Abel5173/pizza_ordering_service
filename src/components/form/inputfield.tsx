import { TextField } from "@mui/material";

interface InputFieldProps {
    name: string;
    label: string;
    type: string;
    placeholder: string;
    register: any;
    value: string;
    required?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
    name,
    label,
    type,
    placeholder = '', // Default value if not provided
    value,
    register,
    onChange,
    required = false, // Default is not required
}: InputFieldProps) {
    return (
        <TextField
            {...register(name)}
            size='small'
            name={name}
            variant='outlined'
            label={label}
            type={type}
            placeholder={placeholder}
            value={value}
            required={required}
            onChange={onChange}
            fullWidth
            sx={{
                marginTop: '1rem',
                backgroundColor: 'white',
                borderRadius: '5px',
                '&:hover': {
                    backgroundColor: '#F0F0F0',
                },
            }}
        />
    )
}