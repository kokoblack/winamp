export const BigText = ({ children }) => {
  return (
    <h1 className="font-railway not-italic text-xxl font-black text-grey">
      {children}
    </h1>
  );
};

export const MidText = ({ children }) => {
  return (
    <h3 className="font-nunito not-italic text-xl font-bold text-grey">
      {children}
    </h3>
  );
};

export const SmallText = ({ children }) => {
  return (
    <h4 className="font-nunito not-italic text-lg font-semibold text-grey m-1 pb-4">
      {children}
    </h4>
  );
};

export const ExtraSmallText = ({ children }) => {
  return (
    <p className="font-nunito not-italic text-base font-medium text-grey m-1">
      {children}
    </p>
  );
};
