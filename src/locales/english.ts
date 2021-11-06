import { ILanguageData } from '@/interfaces/language-data';
import { TileOption } from '@/interfaces/tile-interfaces';
import { TilePolicyKey } from '@/constants/tile-policies';

export const EnglishLanguageData: ILanguageData = {
  title: 'The Carbon Challenge',

  header: {
    about: 'About',
    faq: 'FAQ',
    home: 'Home',
    language: 'Language',
    simulator: 'Simulator',
    takeAction: 'Take Action',
  },

  intro: {
    slogan1: 'Climate change is big.',
    slogan2: 'So we have to go even bigger.',
    startBtn: 'Let\'s Go'
  },

  about: {
    title: 'About The Carbon Challenge',
  },

  faq: {
    title: 'Frequently Asked Questions'
  },

  simulator: {
    analytics: 'Analytics',
    avgTempLabel: 'Warming by 2100',
    close: 'Close',
    settings: 'Settings',
    tempHelpLabel: 'Warming Impacts',

    tileOverlay: {
      current: 'Current Emissions Reduction',
      target: 'Target Emissions Reduction',
      targetYear: 'Target Year',
      emissionPrcntLabel: 'of',
      policiesLabel: 'Policy',
    },

    // Should include all values from the TileType enum
    tileTypes: {
      power: 'Power Plant',
      farm: 'Farm',
      forest: 'Forests',
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
      farm: 'Emissions related to agriculture, including livestock',
      forest: 'Carbon sinks like forests & direct air capture',
      home: 'Emissions related to homes and individual behaviors like driving.',
      office: '',
      factory:
        'Emissions related to industry, including manufacturing of all kinds.',
      empty: '',
    },

    // Should include all values from the TileOption enum
    tileOptionTitles: {
      [TileOption.Aviation]: 'Aviation',
      [TileOption.Deforestation]: 'Deforestation',
      [TileOption.Reforestation]: 'Reforestation',
      [TileOption.EnergyAgriculture]: 'Energy for Agriculture',
      [TileOption.EnergyCommercialBuildings]: 'Energy for Commercial Buildings',
      [TileOption.EnergyIndustry]: 'Energy for Industry',
      [TileOption.EnergyResidential]: 'Energy for Residential Buildings',
      [TileOption.FreightRoadTransport]: 'Freight Trucking',
      [TileOption.FugitiveEmissions]: 'Fugitive Emissions from Energy Production',
      [TileOption.LivestockAndManure]: 'Livestock and Manure',
      [TileOption.PassengerRoadTransport]: 'Passenger Vehicles',
      [TileOption.Shipping]: 'Shipping',
      [TileOption.UnallocatedFuelCombustion]: 'Unallocated Fuel Combustion',
      [TileOption.AgriculturalSoils]: 'Agricultural Soils',
      [TileOption.CropBurning]: 'Crop Burning',
      [TileOption.Cropland]: 'Cropland',
      [TileOption.DirectIndustrialProcesses]: 'Direct Industrial Processes',
      [TileOption.SoilSequestration]: 'Soil Carbon Sequestration',
      [TileOption.Waste]: 'Waste',
    },

    // Should contain all values from TilePolicyKey
    tilePolicies: {
      [TilePolicyKey.None]: {
        name: 'None',
        description: '',
      },
      [TilePolicyKey.Custom]: {
        name: 'Custom',
        description:
          'Create your own fully custom policy.',
      },

      // Factory policies
      [TilePolicyKey.FactoryElectricFreightIncentive]: {
        name: 'Electric Freight Incentives',
        description:
          'Provide tax incentives for electric freight vehicles, cutting gas powered trucks in half by 2050.',
      },
      [TilePolicyKey.FactoryElectricFreightRequirement2050]: {
        name: 'Require All Electric Freight by 2050',
        description:
          'Require all road freight vehicles to be electric by 2050.',
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
      [TilePolicyKey.FactoryDIPReduction]: {
        name: 'Greener Industrial Processes',
        description:  'Use new methods for industrial processes like creating cement to cut emissions by 70% by 2050',
      },

      // Farm policies
      [TilePolicyKey.FarmManureManagement2050]: {
        name: 'Manure Management',
        description: 'Require better manure management to halve emissions from livestock and manure by 2050.',
      },
      [TilePolicyKey.FarmAgriculturalSoilReducedFertilizer]: {
        name: 'Reduced Fertilizer',
        description: 'Reduce Nitrous Oxide emissions by requiring reduced fertilizer use',
      },
      [TilePolicyKey.FarmAgriculturalSoilNoFertilizer]: {
        name: 'Artificial Fertilizer Ban by 2050',
        description: 'Stop Nitrous Oxide emissions from agriculture by completely banning aritifial fertilizers by 2050.',
      },
      [TilePolicyKey.FarmCropBurningReduction]: {
        name: 'Reduced Crop Burning',
        description: 'Enact policies to reduce crop burning by 50% by 2050',
      },
      [TilePolicyKey.FarmCropBurningBan]: {
        name: 'Ban on Crop Burning',
        description: 'Completely ban crop burning by 2050, completely eliminating those emissions.',
      },
      [TilePolicyKey.SoilSequestrationMax]: {
        name: 'Regenerative Agricultural Requirements by 2050',
        description: 'Require implementing regenerative agricultural practices to gets soils sequestering as much carbon as possible by 2050.',
      },
      [TilePolicyKey.FarmRenewableEnergyRequirement2050]: {
        name: 'Require Green Energy for Farming by 2050',
        description: 'Require farming to run on fully renewable energy by 2050.',
      },
      [TilePolicyKey.FarmRenewableEnergyMagic]: {
        name: 'Instantly Convert Agriculture to Green Energy',
        description: 'Instantly switch farms to run completely off of renewable energy.',
      },
      [TilePolicyKey.FarmCroplandManagement]: {
        name: 'Farm Cropland Management',
        description: 'Improve techniques for manging cropland to ensure soils retain all their carbon by 2050',
      },


      // Forest policies
      [TilePolicyKey.ForestDeforestationReduction2050]: {
        name: 'Reduce Deforestation by 2050',
        description: 'Cut yearly deforestation in half by 2050.',
      },
      [TilePolicyKey.ForestDeforestationElimination2050]: {
        name: 'Eliminate Deforestation by 2050',
        description: 'Fully eliminate deforestation by 2050.',
      },
      [TilePolicyKey.ForestSomeReforestation2050]: {
        name: 'Moderate Reforestation by 2050',
        description: 'Reforest 4 million square kilometeres of forest.'
      },
      [TilePolicyKey.ForestMaxReforestation2050]: {
        name: 'Aggressive Reforestation by 2050',
        description: 'Reforest 9.5 million square kilometeres of forest.'
      },

      // Home policies
      [TilePolicyKey.HomeElectricVehicleIncentive]: {
        name: 'Tax Incentives for Electric Vehicles',
        description: 'Provide tax incentives and subsidies for electric vehicles to cut gas powered vehicles in half by 2050.',
      },
      [TilePolicyKey.HomeElectricVehicleRequirement2050]: {
        name: 'Electric Vehicle Requirement by 2050',
        description: 'Phase out gas powered vehicles to get to all passenger vehicles being electric by 2050.',
      },
      [TilePolicyKey.HomeElectricVehicleMagic]: {
        name: 'Instantly Electrify All Passenger Vehicles',
        description: 'Using a global transmutation spell, all personal vehicles instantly become electric, with zero emissions!',
      },
      [TilePolicyKey.HomeRenewableEnergyIncentive]: {
        name: 'Renewable Energy Incentive for Homes',
        description: 'Provide incentives and subsidies to halve emissions from home energy by 2050.',
      },
      [TilePolicyKey.HomeRenewableEnergyRequirement2050]: {
        name: 'Require Green Energy for Homes by 2050',
        description: 'Require homes to run on fully renewable energy by 2050.',
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
      [TilePolicyKey.HomeWasteManagement]: {
        name: 'Greener Waste Management',
        description: 'Improve management of waste (including landfills and waste water) to reduce emissions 80% by 2050',
      },

      // Office policies
      [TilePolicyKey.OfficeRenewableEnergyIncentive]: {
        name: 'Renewable Energy Incentives for Offices',
        description: 'Provide tax incentives to cut emissions from office energy in half by 2050.',
      },
      [TilePolicyKey.OfficeRenewableEnergyRequirement2050]: {
        name: 'Require Green Energy for Offices by 2050',
        description: 'Require office buildings to run on fully renewable energy by 2050.',
      },
      [TilePolicyKey.OfficeRenewableEnergyMagic]: {
        name: 'Instantly Convert Offices to Green Energy',
        description: 'With the help of a great sorcerer, put solar panels on all offices, instantly converting them completely to green energy.',
      },

      // Power policies
      [TilePolicyKey.PowerFugitiveEmissionsClampDown]: {
        name: 'Fugitive Emissions Clampdown',
        description: 'Clamp down on fugitive emissions from fossil fuel production, halving related emissions by 2050.',
      },
      [TilePolicyKey.PowerFugitiveEmissionsBan2050]: {
        name: 'Fossil Fuel Extraction Ban by 2050',
        description: 'Reduce fossil fuel extraction culminating in a ban by 2050, fully reducing fugitive emissions by 2050.',
      },
      [TilePolicyKey.PowerUnallocatedFuelReduction2050]: {
        name: 'Reduce Unallocated Fuel Emissions',
        description: 'Use strict laws to reduce emissions from home heating and other unallocated sources 80% by 2050.',
      },
    }
  },

  notFound: {
    title: 'Not Found',
    heading: '404 - Page Not Found!',
    body: "Hm, we couldn't find that page!",
    returnText: 'Return to Carbon Challenge Home',
  }
};
