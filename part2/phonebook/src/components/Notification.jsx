const Notification = ({ message }) => {
  if (message === null) return null;

  const styles = {
    color: "green",
    borderStyle: "solid",
    borderRadius: 10,
    padding: 10,
    background: "lightgray",
    fontWeight: "bold",
  };

  return <p style={styles}>{message}</p>;
};

export default Notification;
