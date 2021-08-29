import { ILanguageData } from '@/interfaces/language-data';
import { TilePolicyKey } from '@/constants/tile-policies';

export const EnglishLanguageData: ILanguageData = {
  title: 'The Carbon Challenge',

  header: {
    home: 'Home',
    simulator: 'Simulator',
    disclaimers: 'Disclaimers',
    about: 'About',
    language: 'Language',
  },

  intro: {
    slogan1: 'Climate change is big.',
    slogan2: 'So we have to go even bigger.',
    startBtn: 'Let\'s Go'
  },

  about: {
    title: 'About The Carbon Challenge',
  },

  simulator: {
    avgTempLabel: 'Avg. Global Increase by 2100',
    close: 'Close',
    tileOverlay: {
      current: 'Current',
      target: 'Target Emissions Reduction',
      targetYear: 'Target Year',
      emissionPrcntLabel: 'orig.',
      policiesLabel: 'Policy',
    },
    // Should include all values from the TileType enum
    tileTypes: {
      power: 'Power Plant',
      farm: 'Farm',
      forest: 'Forest',
      home: 'Home',
      office: 'Office',
      factory: 'Factory',
      empty: 'Empty',
    },

    // Optional descriptions of each tile type, explaining what falls under this
    // tile and where expected options may be if they fall under another tile.
    // Should include all values from the TileType enum
    tileTypeDescriptions: {
      power:
        'Emissions that are broadly tied to generating power. Emissions for ' +
        'specific uses are under the Home, Office, and Factory tiles.',
      farm: '',
      forest: '',
      home: 'Emissions related to homes and individual behaviors like driving.',
      office: '',
      factory:
        'Emissions related to industry, including manufacturing of all kinds.',
      empty: '',
    },

    // Should include all values from the TileOption enum
    tileOptionTitles: {
      aviation: 'Aviation',
      deforestation: 'Deforestation',
      energyAgriculture: 'Energy for Agriculture',
      energyCommercialBuildings: 'Energy for Commercial Buildings',
      energyIndustry: 'Energy for Industry',
      energyResidential: 'Energy for Residential Buildings',
      freightRoadTransport: 'Freight Trucking',
      fugitiveEmissions: 'Fugitive Emissions from Energy Production',
      livestockAndManure: 'Livestock and Manure',
      passengerRoadTransport: 'Passenger Vehicles',
      shipping: 'Shipping',
      unallocatedFuelCombustion: 'Unallocated Fuel Combustion',
    },

    // Should contain all values from TilePolicyKey
    tilePolicies: {
      [TilePolicyKey.None]: {
        name: 'None',
        description:
          'Keep related emissions the same for the forseable future.',
      },
      [TilePolicyKey.Custom]: {
        name: 'Custom',
        description:
          'Create your own fully custom policy.',
      },

      // Factory policies
      [TilePolicyKey.FactoryElectricFreightRequirement2050]: {
        name: 'Require All Electric Freight by 2050',
        description:
          'Require all road freight vehicles to be electric by 2050.',
      },
      [TilePolicyKey.FactoryElectricFreightIncentive]: {
        name: 'Electric Freight Incentives',
        description:
          'Provide tax incentives for electric freight vehicles, cutting gas powered trucks in half by 2050.',
      },
      [TilePolicyKey.FactoryElectricFreightMagic]: {
        name: 'Instant Electric Freight Conversion',
        description:
          'Using an ancient rune, instantly electrify all freight vehicles.',
      },
      [TilePolicyKey.FactoryShippingElectricRequirement2050]: {
        name: 'Electrified Shipping Requirement by 2050',
        description:
          'Require all shipping to be powered by Electrified boats by 2050.',
      },
      [TilePolicyKey.FactoryRenewableEnergyRequirement2050]: {
        name: 'Require Green Energy for Industry by 2050',
        description: 'Require industry to run on fully renewable energy by 2050.',
      },
      [TilePolicyKey.FactoryRenewableEnergyMagic]: {
        name: 'Instantly Convert Industry to Green Energy',
        description: 'Instantly switch all power sources for industry to renewables.',
      },

      // Farm policies
      [TilePolicyKey.FarmManureManagement2050]: {
        name: 'Manure Management',
        description: 'Require better manure management to halve emissions from livestock and manure by 2050.',
      },
      [TilePolicyKey.FarmDeforestationElimination2050]: {
        name: 'Eliminate Deforestation by 2050',
        description: 'Fully eliminate deforestation by 2050.',
      },
      [TilePolicyKey.FarmRenewableEnergyRequirement2050]: {
        name: 'Require Green Energy for Farming by 2050',
        description: 'Require farming to run on fully renewable energy by 2050.',
      },
      [TilePolicyKey.FarmRenewableEnergyMagic]: {
        name: 'Instantly Convert Agriculture to Green Energy',
        description: 'Instantly switch farms to run completely off of renewable energy.',
      },

      // Home policies
      [TilePolicyKey.HomeElectricVehicleRequirement2050]: {
        name: 'Electric Vehicle Requirement by 2050',
        description: 'Phase out gas powered vehicles to get to all passenger vehicles being electric by 2050.',
      },
      [TilePolicyKey.HomeElectricVehicleIncentive]: {
        name: 'Tax Incentives for Electric Vehicles',
        description: 'Provide tax incentives and subsidies for electric vehicles to cut gas powered vehicles in half by 2050.',
      },
      [TilePolicyKey.HomeElectricVehicleMagic]: {
        name: 'Instantly Electrify All Passenger Vehicles',
        description: 'Using a global transmutation spell, all personal vehicles instantly become electric, with zero emissions!',
      },
      [TilePolicyKey.HomeRenewableEnergyRequirement2050]: {
        name: 'Require Green Energy for Homes by 2050',
        description: 'Require homes to run on fully renewable energy by 2050.',
      },
      [TilePolicyKey.HomeRenewableEnergyIncentive]: {
        name: 'Renewable Energy Incentive for Homes',
        description: 'Provide incentives and subsidies to halve emissions from home energy by 2050.',
      },
      [TilePolicyKey.HomeRenewableEnergyMagic]: {
        name: 'Instantly Convert Homes to Green Energy',
        description: 'By distributing cold-fusion reactors to every house from the future, instantly convert all homes to run completely on green energy.',
      },
      [TilePolicyKey.HomeAirTravelIncentive]: {
        name: 'Air Travel Incentives',
        description: 'Use tax incentives or fees to cut air travel in half by 2050.',
      },
      [TilePolicyKey.HomeAirTravelMagic]: {
        name: 'Instantly Electrify Air Travel',
        description: 'By training a fleet of levitation wizards, make all planes run emission free.',
      },

      // Office policies
      [TilePolicyKey.OfficeRenewableEnergyRequirement2050]: {
        name: 'Require Green Energy for Offices by 2050',
        description: 'Require office buildings to run on fully renewable energy by 2050.',
      },
      [TilePolicyKey.OfficeRenewableEnergyIncentive]: {
        name: 'Renewable Energy Incentives for Offices',
        description: 'Provide tax incentives to cut emissions from office energy in half by 2050.',
      },
      [TilePolicyKey.OfficeRenewableEnergyMagic]: {
        name: 'Instantly Convert Offices to Green Energy',
        description: 'With the help of a great sorcerer, put solar panels on all offices, instantly converting them completely to green energy.',
      },

      // Power policies
      [TilePolicyKey.PowerFugitiveEmissionsBan2050]: {
        name: 'Fossil Fuel Extraction Ban by 2050',
        description: 'Reduce fossil fuel extraction culminating in a ban by 2050, fully reducing fugitive emissions by 2050.',
      },
      [TilePolicyKey.PowerFugitiveEmissionsClampDown]: {
        name: 'Fugitive Emissions Clampdown',
        description: 'Clamp down on fugitive emissions from fossil fuel production, halving related emissions by 2050.',
      },
      [TilePolicyKey.PowerUnallocatedFuelReduction2050]: {
        name: 'Reduce Unallocated Fuel Emissions',
        description: 'Use tax incentives and subsidies to reduce emissions from home heating and other unallocated sources',
      },
    }
  }
};
