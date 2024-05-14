export const Notification = ({ message, type }) => {
    if (message == null) {
        return null;
    }

    const className = `notification ${type}`;
    return (
        <div className={className}>
            {message}
        </div>
    );
}
