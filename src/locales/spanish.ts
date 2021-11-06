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
      [TileOption.DirectAirCapture]: 'Captura De Aire Directa',
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
        name: 'Personalizado',
        description:
          'Cree su propia política totalmente personalizada.',
      },

      // Factory Policies
      [TilePolicyKey.FactoryElectricFreightIncentive]: {
        name: 'Incentivos de flete eléctrico',
        description:
          'Proporcionar incentivos fiscales para los vehículos eléctricos de carga, reduciendo a la mitad los camiones a gasolina para 2050.',
      },
      [TilePolicyKey.FactoryElectricFreightRequirement2050]: {
        name: 'Requerir todo el flete eléctrico para 2050',
        description:
          'Exigir que todos los vehículos de carga por carretera sean eléctricos para 2050.',
      },
      [TilePolicyKey.FactoryElectricFreightMagic]: {
        name: 'Conversión instantánea de carga eléctrica',
        description:
          'Usando una runa antigua, electrifica instantáneamente todos los vehículos de carga.',
      },
      [TilePolicyKey.FactoryShippingElectricRequirement2050]: {
        name: 'Requisito de envío electrificado para 2050',
        description:
          'Exigir que todos los envíos sean propulsados ​​por barcos electrificados para 2050.',
      },
      [TilePolicyKey.FactoryRenewableEnergyRequirement2050]: {
        name: 'Requerir energía verde para la industria para 2050',
        description: 'Exigir que la industria funcione con energía totalmente renovable para 2050.',
      },
      [TilePolicyKey.FactoryRenewableEnergyMagic]: {
        name: 'Convertir instantáneamente la industria en energía verde',
        description: 'Cambie instantáneamente todas las fuentes de energía para la industria a energías renovables.',
      },
      [TilePolicyKey.FactoryDIPReduction]: {
        name: 'Procesos industriales más ecológicos',
        description: 'Utilizar nuevos métodos para procesos industriales como la creación de cemento para reducir las emisiones en un 70% para 2050',
      },

      // Farm Policies
      [TilePolicyKey.FarmManureManagement2050]: {
        name: 'Manejo del estiércol',
        description: 'Exigir una mejor gestión del estiércol para reducir a la mitad las emisiones del ganado y el estiércol para 2050.',
      },
      [TilePolicyKey.FarmAgriculturalSoilReducedFertilizer]: {
        name: 'Fertilizante reducido',
        description: 'Reducir las emisiones de óxido nitroso al exigir un uso reducido de fertilizantes',
      },
      [TilePolicyKey.FarmAgriculturalSoilNoFertilizer]: {
        name: 'Prohibición de fertilizantes artificiales para 2050',
        description: 'Detener las emisiones de óxido nitroso de la agricultura prohibiendo por completo los fertilizantes aritifiales para 2050.',
      },
      [TilePolicyKey.FarmCropBurningReduction]: {
        name: 'Reducción de la quema de cultivos',
        description: 'Promulgar políticas para reducir la quema de cultivos en un 50% para 2050',
      },
      [TilePolicyKey.FarmCropBurningBan]: {
        name: 'Prohibición de la quema de cultivos',
        description: 'Prohibir por completo la quema de cultivos para 2050, eliminando por completo esas emisiones.',
      },
      [TilePolicyKey.SoilSequestrationMax]: {
        name: 'Requisitos agrícolas regenerativos para 2050',
        description: 'Exigir la implementación de prácticas agrícolas regenerativas para que los suelos capturen la mayor cantidad de carbono posible para 2050.',
      },
      [TilePolicyKey.FarmRenewableEnergyRequirement2050]: {
        name: 'Requerir energía verde para la agricultura para 2050',
        description: 'Exigir que la agricultura funcione con energía totalmente renovable para 2050.',
      },
      [TilePolicyKey.FarmRenewableEnergyMagic]: {
        name: 'Convertir la agricultura en energía verde al instante',
        description: 'Cambie instantáneamente las granjas para que funcionen completamente con energía renovable.',
      },
      [TilePolicyKey.FarmCroplandManagement]: {
        name: 'Gestión de tierras agrícolas',
        description: 'Mejorar las técnicas de gestión de las tierras de cultivo para garantizar que los suelos retengan todo su carbono para 2050',
      },


      // Forest Policies
      [TilePolicyKey.ForestDeforestationReduction2050]: {
        name: 'Reducir la deforestación para 2050',
        description: 'Reducir la deforestación anual a la mitad para 2050.',
      },
      [TilePolicyKey.ForestDeforestationElimination2050]: {
        name: 'Eliminar la deforestación para 2050',
        description: 'Eliminar completamente la deforestación para 2050.',
      },
      [TilePolicyKey.ForestSomeReforestation2050]: {
        name: 'Reforestación moderada para 2050',
        description: 'Reforestar 4 millones de kilómetros cuadrados de bosque.',
      },
      [TilePolicyKey.ForestMaxReforestation2050]: {
        name: 'Reforestación agresiva para 2050',
        description: 'Reforestar 9,5 millones de kilómetros cuadrados de bosque.',
      },
      [TilePolicyKey.ForestDirectAirCaptureModerate]: {
        name: 'Captura de aire directa moderada para 2050',
        description: 'Realizar inversiones moderadas en tecnología de captura directa de aire para eliminar alrededor de una Gigatonelada de CO2 por año para 2050.'
      },
      [TilePolicyKey.ForestDirectAirCaptureMax]: {
        name: 'Maximizar la captura directa de aire para 2050',
        description: 'Realizar inversiones significativas en tecnología de captura directa de aire para eliminar alrededor de varias Gigatoneladas de CO2 por año para 2050.'
      },

      // Home Policies
      [TilePolicyKey.HomeElectricVehicleIncentive]: {
        name: 'Incentivos fiscales para vehículos eléctricos',
        description: 'Proporcionar incentivos fiscales y subsidios para vehículos eléctricos para reducir a la mitad los vehículos a gasolina para 2050.',
      },
      [TilePolicyKey.HomeElectricVehicleRequirement2050]: {
        name: 'Requisito de vehículos eléctricos para 2050',
        description: 'Eliminar gradualmente los vehículos que funcionan con gasolina para que todos los vehículos de pasajeros sean eléctricos para 2050.',
      },
      [TilePolicyKey.HomeElectricVehicleMagic]: {
        name: 'Electrificar instantáneamente todos los vehículos de pasajeros',
        description: '¡Usando un hechizo de transmutación global, todos los vehículos personales se vuelven eléctricos instantáneamente, con cero emisiones!',
      },
      [TilePolicyKey.HomeRenewableEnergyIncentive]: {
        name: 'Incentivo de energía renovable para hogares',
        description: 'Proporcionar incentivos y subsidios para reducir a la mitad las emisiones de la energía doméstica para 2050.',
      },
      [TilePolicyKey.HomeRenewableEnergyRequirement2050]: {
        name: 'Requerir energía verde para los hogares para 2050',
        description: 'Exigir que los hogares funcionen con energía totalmente renovable para 2050.',
      },
      [TilePolicyKey.HomeRenewableEnergyMagic]: {
        name: 'Convertir casas instantáneamente en energía verde',
        description: 'Al distribuir reactores de fusión fría a todas las casas del futuro, convierta instantáneamente todas las casas para que funcionen completamente con energía verde.',
      },
      [TilePolicyKey.HomeAirTravelIncentive]: {
        name: 'Incentivos para viajes aéreos',
        description: 'Utilice incentivos fiscales o tarifas para reducir los viajes aéreos a la mitad para 2050.',
      },
      [TilePolicyKey.HomeAirTravelMagic]: {
        name: 'Electrificar instantáneamente los viajes aéreos',
        description: 'Al entrenar una flota de magos de la levitación, haz que todos los aviones funcionen libres de emisiones.',
      },
      [TilePolicyKey.HomeWasteManagement]: {
        name: 'Gestión de residuos más ecológica',
        description: 'Mejorar la gestión de los residuos (incluidos los vertederos y las aguas residuales) para reducir las emisiones en un 80% para 2050',
      },

      // Office Policies
      [TilePolicyKey.OfficeRenewableEnergyIncentive]: {
        name: 'Incentivos de energía renovable para oficinas',
        description: 'Proporcionar incentivos fiscales para reducir las emisiones de la energía de las oficinas a la mitad para 2050.',
      },
      [TilePolicyKey.OfficeRenewableEnergyRequirement2050]: {
        name: 'Requerir energía verde para oficinas para 2050',
        description: 'Exigir que los edificios de oficinas funcionen con energía totalmente renovable para 2050.',
      },
      [TilePolicyKey.OfficeRenewableEnergyMagic]: {
        name: 'Convertir instantáneamente oficinas en energía verde',
        description: 'Con la ayuda de un gran hechicero, coloque paneles solares en todas las oficinas, convirtiéndolos instantáneamente en energía verde.',
      },

      // Power Policies
      [TilePolicyKey.PowerFugitiveEmissionsClampDown]: {
        name: 'Reducción de emisiones fugitivas',
        description: 'Reducir las emisiones fugitivas de la producción de combustibles fósiles, reduciendo a la mitad las emisiones relacionadas para 2050.',
      },
      [TilePolicyKey.PowerFugitiveEmissionsBan2050]: {
        name: 'Prohibición de la extracción de combustibles fósiles para 2050',
        description: 'Reducir la extracción de combustibles fósiles que culmine en una prohibición para 2050, reduciendo completamente las emisiones fugitivas para 2050.',
      },
      [TilePolicyKey.PowerUnallocatedFuelReduction2050]: {
        name: 'Reducir las emisiones de combustible no asignado',
        description: 'Use leyes estrictas para reducir las emisiones de la calefacción doméstica y otras fuentes no asignadas en un 80% para 2050.',
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
