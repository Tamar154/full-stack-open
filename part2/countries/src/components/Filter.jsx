const Filter = ({ query, onChange }) => {
  return (
    <div>
      find countries
      <input type="text" value={query} onChange={onChange} />
    </div>
  );
};

export default Filter;
