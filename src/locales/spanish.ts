import { ILanguageData } from '@/interfaces/language-data';
import { TilePolicyKey } from '@/constants/tile-policies';

export const SpanishLanguageData: ILanguageData = {
  title: 'El Desafío Del Carbono',

  header: {
    home: 'Hogar',
    simulator: 'Simulador',
    disclaimers: 'Advertencias',
    about: 'Sobre',
    language: 'Lingua',
  },

  intro: {
    slogan1: 'El cambio climático es grande.',
    slogan2: 'Así que tenemos que ir aún más grandes.',
    startBtn: 'Vamos'
  },

  about: {
    title: 'Sobre El Desafío Del Carbono',
  },

  simulator: {
    avgTempLabel: 'Aumento global promedio para 2100',
    close: 'Cerrar',
    tileOverlay: {
      current: 'Actual',
      target: 'Objetivo',
      targetYear: 'Año objetivo',
      emissionPrcntLabel: 'orig.',
      policiesLabel: '',
    },
    // Should include all values from the TileType enum
    tileTypes: {
      power: 'Planta de energía',
      farm: 'Granja',
      forest: 'Bosque',
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
      // TODO: Fill these out
      aviation: '',
      commercialRoadTransport: '',
      deforestation: '',
      energyAgriculture: '',
      energyCommercialBuildings: '',
      energyIndustry: '',
      energyResidential: '',
      freightRoadTransport: '',
      fugitiveEmissions: '',
      livestockAndManure: '',
      passengerRoadTransport: '',
      shipping: '',
      unallocatedFuelCombustion: '',
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
      [TilePolicyKey.FactoryShippingElectricRequirement2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FactoryRenewableEnergyRequirement2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FarmManureManagement2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FarmDeforestationElimination2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.FarmRenewableEnergyRequirement2050]: {
        name: '',
        description: '',
      },
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
      [TilePolicyKey.HomeAirTravelIncentive]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.OfficeRenewableEnergyRequirement2050]: {
        name: '',
        description: '',
      },
      [TilePolicyKey.OfficeRenewableEnergyIncentive]: {
        name: '',
        description: '',
      },
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
  }
};
