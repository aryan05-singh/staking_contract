// Navigation.jsx
import ConnectedAccount from "./ConnectedAccount";
import ConnectedNetwork from "./ConnectedNetwork";

const Navigation = () => {
  // Inline CSS styles
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f4f4f4',
    borderBottom: '1px solid #ddd',
  };

  return (
    <nav style={navStyle}>
      <ConnectedAccount />
      <ConnectedNetwork />
    </nav>
  );
};

export default Navigation;
