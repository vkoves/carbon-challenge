/**
 * A common interface for all our language data objects we pass into the i18n
 * library. We need an interface for the configurations for each language to
 * ensure that our translations our consistent and complete. If we add a new
 * key, this will ensure it is added in each language file.
 */
export interface ILanguageData {
  title: string;
  // These are also used for page titles
  header: {
    home: string;
    simulator: string;
    disclaimers: string;
    about: string;
    language: string;
  };
  intro: {
    slogan1: string;
    slogan2: string;
    startBtn: string;
  };
  simulator: {
    avgTempLabel: string;
    close: string;
    tileOverlay: {
      current: string;
      target: string;
      targetYear: string;
    };
    // Should include all values from the TileType enum
    tileTypes: {
      power: string;
      farm: string;
      forest: string;
      house: string;
      office: string;
      factory: string;
      empty: string;
    };
    // Should include all values from the TileOption enum
    tileOptions: {
      aviationElectrification: string;
      businessElectricVehicleShare: string;
      deforestation: string;
      electrificationPercent: string;
      fugitiveEmissionsReduction: string;
      livestockAndManure: string;
      renewableShare: string;
      renewableShareAgriculture: string;
      residentialElectricCarShare: string;
      shipping: string;
    };
  }
}
