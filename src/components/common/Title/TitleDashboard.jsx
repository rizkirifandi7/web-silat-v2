import React from "react";

const TitleDashboard = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-base text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default TitleDashboard;
