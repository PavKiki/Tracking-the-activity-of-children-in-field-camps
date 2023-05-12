import "css-components/BlueUploadButton.css"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function BlueUploadButton(props: ButtonProps): React.ReactElement<ButtonProps> {
    const { children, ...rest } = props;
    return (
        <button className="blue-add-button" {...rest}>
            {children}
        </button>
    )
}