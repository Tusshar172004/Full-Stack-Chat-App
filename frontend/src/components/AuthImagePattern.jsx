const AuthImagePattern = ({ title, subtitle }) => {
  return (
 <div className="right-section">
  <div className="right-content">
    <div className="grid-box">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className={`grid-square ${i % 2 === 0 ? "pulse" : ""}`}
        />
      ))}
    </div>
    <h2 className="right-title">{title}</h2>
    <p className="right-subtitle">{subtitle}</p>
  </div>
</div>
  );
};

export default AuthImagePattern;