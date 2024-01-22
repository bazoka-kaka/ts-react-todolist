const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, style, ...rest }) => (
  <button
    {...rest}
    style={{
      cursor: "pointer",
      backgroundColor: "black",
      color: "white",
      ...style,
    }}
  >
    {children}
  </button>
);

export default Button;
