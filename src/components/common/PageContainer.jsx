const PageContainer = ({ children }) => {
    return (
        <div className="max-w-screen-lg w-full mx-auto space-y-6 pb-12 animate-fadeIn px-2 sm:px-4 md:px-6">
            {children}
        </div>
    );
};

export default PageContainer;
