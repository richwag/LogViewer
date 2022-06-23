function FieldError(props: { errorMessage: string, show: boolean }) {
    return (<>{props.show && <div className="invalid-feedback" style={{ display: 'block' }}>{props.errorMessage}</div>}</>);
}

export { FieldError };