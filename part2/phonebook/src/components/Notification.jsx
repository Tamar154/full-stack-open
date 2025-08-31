const Notification = ({ notification }) => {
  if (notification == null) return null;

  const { message, success } = notification;

  const styles = {
    color: success ? "green" : "red",
    borderStyle: "solid",
    borderRadius: 10,
    padding: 10,
    background: "lightgray",
    fontWeight: "bold",
  };

  return <p style={styles}>{message}</p>;
};

export default Notification;
