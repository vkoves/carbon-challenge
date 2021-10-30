import { ILanguageData } from '@/interfaces/language-data';
import { TileOption } from '@/interfaces/tile-interfaces';
import { TilePolicyKey } from '@/constants/tile-policies';

export const SpanishLanguageData: ILanguageData = {
  title: 'El Desafío Del Carbono',

  header: {
    about: 'Sobre',
    faq: 'FAQ',
    home: 'Hogar',
    language: 'Lingua',
    simulator: 'Simulador',
    takeAction: 'Tomar Acción',
  },

  intro: {
    slogan1: 'El cambio climático es grande.',
    slogan2: 'Así que tenemos que ir aún más grandes.',
    startBtn: 'Vamos'
  },

  about: {
    title: 'Sobre El Desafío Del Carbono',
  },

  faq: {
    title: 'Preguntas Frecuentes'
  },

  simulator: {
    analytics: 'Analítica',
    avgTempLabel: 'Calentamiento para el 2100',
    close: 'Cerrar',
    settings: 'Ajustes',
    tempHelpLabel: 'Impactos de calentamiento',

    tileOverlay: {
      current: 'Reducción de emisiones actuales',
      target: 'Reducción de emisiones objetivo',
      targetYear: 'Año objetivo',
      emissionPrcntLabel: 'de.',
      policiesLabel: '',
    },

    // Should include all values from the TileType enum
    tileTypes: {
      power: 'Planta de energía',
      farm: 'Granja',
      forest: 'Bosques',
      home: 'Casa',
      office: 'Oficina',
      factory: 'Fábrica',
      empty: 'Vacío',
    },

    // Optional descriptions of each tile type, explaining what falls under this
    // tile and where expected options may be if they fall under another tile.
    // Should include all values from the TileType enum
    tileTypeDescriptions: {
      // TODO: Add translations
      power: '',
      farm: null,
      forest: null,
      home: null,
      office: null,
      factory: null,
      empty: null,
    },
    // Should include all values from the TileOption enum
    tileOptionTitles: {
      [TileOption.Aviation]: 'Aviación',
      [TileOption.Deforestation]: 'Deforestación',
      [TileOption.Reforestation]: 'Reforestación',
      [TileOption.EnergyAgriculture]: 'Energía para la agricultura',
      [TileOption.EnergyCommercialBuildings]: 'Energía para edificios comerciales',
      [TileOption.EnergyIndustry]: 'Energía para la industria',
      [TileOption.EnergyResidential]: 'Energía para edificios residenciales',
      [TileOption.FreightRoadTransport]: 'Transporte de mercancías',
      [TileOption.FugitiveEmissions]: 'Emisiones fugitivas de la producción de energía',
      [TileOption.LivestockAndManure]: 'Ganadería y estiércol',
      [TileOption.PassengerRoadTransport]: 'Vehículos de pasajeros',
      [TileOption.Shipping]: 'Envío',
      [TileOption.UnallocatedFuelCombustion]: 'Combustión de combustible no asignado',
      [TileOption.AgriculturalSoils]: 'Suelos agrícolas',
      [TileOption.CropBurning]: 'Quema de cultivos',
      [TileOption.Cropland]: 'Tierras de cultivo',
      [TileOption.DirectIndustrialProcesses]: 'Procesos industriales directos',
      [TileOption.Waste]: 'Residuos',
    },

    // Should contain all values from TilePolicyKey
    tilePolicies: {
      [TilePolicyKey.None]: {
        name: 'Ninguno',
        description: '',
      },
      [TilePolicyKey.Custom]: {
        name: 'Personalizada',
        description: '',
      },

      // Factory policies
      [TilePolicyKey.FactoryElectricFreightRequirement2050]: {
        name: 'Requerir toda la carga eléctrica para 2050',
        description:
          'Exigir que todos los vehículos de carga por carretera sean eléctricos para 2050',
      },
      [TilePolicyKey.FactoryElectricFreightIncentive]: {
        name: 'Incentivos de flete eléctrico',
        description:
          'Proporcionar incentivos fiscales para vehículos eléctricos de carga, recortando gasolina '+
          'impulsará camiones a la mitad para 2100.',
      },
      [TilePolicyKey.FactoryElectricFreightMagic]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FactoryShippingElectricRequirement2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FactoryRenewableEnergyRequirement2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FactoryRenewableEnergyMagic]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FactoryDIPReduction]: {
        name: '',
        description:  '',
      },

      // Farm policies
      [TilePolicyKey.FarmManureManagement2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FarmRenewableEnergyRequirement2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FarmRenewableEnergyMagic]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FarmAgriculturalSoilReducedFertilizer]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FarmAgriculturalSoilNoFertilizer]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FarmCroplandManagement]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FarmCropBurningReduction]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FarmCropBurningBan]: {
        name: '',
        description: '',
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
      [TilePolicyKey.HomeElectricVehicleRequirement2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.HomeElectricVehicleIncentive]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.HomeElectricVehicleMagic]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.HomeRenewableEnergyRequirement2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.HomeRenewableEnergyIncentive]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.HomeRenewableEnergyMagic]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.HomeAirTravelIncentive]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.HomeAirTravelMagic]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.HomeWasteManagement]: {
        name: '',
        description: '',
      },

      // Office policies
      [TilePolicyKey.OfficeRenewableEnergyRequirement2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.OfficeRenewableEnergyIncentive]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.OfficeRenewableEnergyMagic]: {
        name: '',
        description: '',
      },

      // Power policies
      [TilePolicyKey.PowerFugitiveEmissionsBan2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.PowerFugitiveEmissionsClampDown]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.PowerUnallocatedFuelReduction2050]: {
        name: '',
        description: '',
      },
    }
  },

  notFound: {
     title: 'No encontrado',
     heading: '404 - ¡Página no encontrada!',
     body: "Hm, ¡no pudimos encontrar esa página!",
     returnText: 'Regresar al inicio del Carbon Challenge',
   },
};
