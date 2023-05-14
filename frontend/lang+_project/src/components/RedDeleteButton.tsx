import "css-components/RedDeleteButton.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RedDeleteButton(props: ButtonProps): React.ReactElement<ButtonProps> {
    const { children, ...rest } = props;
    return (
        <button className="red-delete-button" {...rest}>
            {children}
        </button>
    )
}