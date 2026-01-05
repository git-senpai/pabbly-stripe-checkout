const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = { sm: 20, md: 32, lg: 48 };
  const s = sizes[size] || 32;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div style={{
        width: s,
        height: s,
        border: '2px solid #d4c9b8',
        borderTopColor: '#5a6b4a',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      {text && <p style={{ color: '#6b6560', fontSize: '14px', fontFamily: 'Georgia, serif' }}>{text}</p>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Loader;