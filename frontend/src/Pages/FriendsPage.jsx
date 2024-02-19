import React, { useEffect, useState } from "react";
import TopBar from "../components/Top/TopBar";
import TopTabs from "../components/Top/TopTabs";
import Friend from "../components/Friend";

const FriendsPage = () => {
  return (
    <div className="bg-cream h-screen flex flex-col">
      <TopBar pageName={"ZenChat"}/>
      <TopTabs />
      <Friend friendName={"Thomas"}/> {/* Faire passer le nom de l'ami de la BDD en paramètre */}
      <Friend friendName={"Arthur"}/>
      <Friend friendName={"John"}/>
    </div>
  );
};

export default FriendsPage;
