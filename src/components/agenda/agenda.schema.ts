import * as yup from 'yup';

const recordTypeSchema = yup.object().shape({
    Name: yup.string().optional()
});

const accountSchema = yup.object().shape({
    Name: yup.string().optional(),
    BillingStreet: yup.string().optional(),
    BillingCity: yup.string().optional(),
    CUILCUIT: yup.string().optional(),
    Phone: yup.string().optional(),
    EmailNewcon: yup.string().optional(),
    RecordType: recordTypeSchema.optional(),
    Sexo: yup.string().optional(),
    BillingPostalCode: yup.string().optional()
});

const assetSchema = yup.object().shape({
    Sales_suffix_description: yup.string().optional()
});

const requerimientoSchema = yup.object().shape({
    AsesorTecnico: yup.string().optional(),
    TiempoCliente: yup.string().optional(),
    Sintoma: yup.string().optional(),
    Tiempo: yup.string().optional(),
    TestDrive: yup.string().optional(),
    PruebaEstatica: yup.string().optional(),
    InformacionAdicional: yup.string().optional(),
    UsoUnidad: yup.string().optional(),
    Que: yup.string().optional(),
    Cuando: yup.string().optional(),
    Frecuencia: yup.string().optional(),
    Condiciones: yup.string().optional(),
    TipoCamino: yup.string().optional(),
    LugarAuto: yup.string().optional(),
    ConfirmadaCliente: yup.string().optional(),
    Origen: yup.string().optional(),
    Tipo: yup.string().optional(),
    Seccion: yup.string().optional(),
    Detalle: yup.string().optional()
});

const workOrderSchema = yup.object().shape({
    WorkOrderId: yup.string().required(),
    AccountFirstName: yup.string().required(),
    AccountLastName: yup.string().required(),
    AccountTipoDeDocumento: yup.string().optional(),
    AccountNumeroDeDocumento: yup.string().optional(),
    AccountPersonMobilePhone: yup.string().optional(),
    AccountPersonEmail: yup.string().optional(),
    AccountBillingAddress: yup.string().optional(),
    Account: accountSchema.optional(),
    TipoDeTrabajo: yup.string().optional(),
    Modelo: yup.string().optional(),
    Patente: yup.string().optional(),
    VIN: yup.string().required(),
    Kilometraje: yup.string().optional(),
    EsperaElVehiculo: yup.string().optional(),
    SchedStartTime: yup.date().optional(),
    SchedEndTime: yup.date().optional(),
    ServiceTerritoryName: yup.string().optional(),
    ServiceTerritoryId: yup.string().optional(),
    IdPreOrden: yup.string().optional(),
    FechaHoraEntregaVehiculo: yup.date().optional(),
    FechaHoraRecepcionVehiculo: yup.date().optional(),
    ClienteSinCitaPrevia: yup.string().optional(),
    FIR: yup.string().optional(),
    NoFIR: yup.string().optional(),
    NombreContacto: yup.string().optional(),
    ApellidoContacto: yup.string().optional(),
    EmailContacto: yup.string().optional(),
    CelularContacto: yup.string().optional(),
    Precio: yup.string().optional(),
    Marca: yup.string().optional(),
    Cancelado: yup.string().optional(),
    Asset: assetSchema.optional(),
    Requerimiento: yup.array().of(requerimientoSchema).optional(),
    AsesorCitas: yup.string().optional()
});

export const requestBodyAgendaSchema = yup.object().shape({
    IdPeticion: yup.string().required(),
    WorkOrder: workOrderSchema.required()
});