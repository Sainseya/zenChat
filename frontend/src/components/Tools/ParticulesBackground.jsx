import React, { useEffect } from "react";
import { tsParticles } from "https://cdn.jsdelivr.net/npm/@tsparticles/engine@3.1.0/+esm";
import { loadAll } from "https://cdn.jsdelivr.net/npm/@tsparticles/all@3.1.0/+esm";
import particulesConfig from "../../config/particulesConfig";


function ParticlesBackground() {
  useEffect(() => {
    async function loadParticles(options) {
      await loadAll(tsParticles);
      await tsParticles.load({ id: "tsparticles", options });

    }

    const configs = particulesConfig;

    loadParticles(configs);
  }, []);

  return <div id="tsparticles" className="absolute inset-0 z-0"></div>;
}

export default ParticlesBackground;
