const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const sizeClass = sizes[size] || sizes.md;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizeClass} border-2 border-[#d4c9b8] border-t-[#5a6b4a] rounded-full animate-spin`} />
      {text && (
        <p className="text-[#6b6560] text-sm font-serif">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;