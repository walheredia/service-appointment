interface RecordType {
    Name?: string;
}

export interface Account {
    Name?: string;
    BillingStreet?: string;
    BillingCity?: string;
    CUILCUIT?: string;
    Phone?: string;
    EmailNewcon?: string;
    RecordType?: RecordType;
    Sexo?: string;
    BillingPostalCode?: string;
}

interface Asset {
    Sales_suffix_description?: string;
}

export interface Requerimiento {
    AsesorTecnico?: string;
    TiempoCliente?: string;
    Sintoma?: string;
    Tiempo?: string;
    TestDrive?: string;
    PruebaEstatica?: string;
    InformacionAdicional?: string;
    UsoUnidad?: string;
    Que?: string;
    Cuando?: string;
    Frecuencia?: string;
    Condiciones?: string;
    TipoCamino?: string;
    LugarAuto?: string;
    ConfirmadaCliente?: string;
    Origen?: string;
    Tipo?: string;
    Seccion?: string;
    Detalle?: string;
}

export interface WorkOrder {
    WorkOrderId: string;
    AccountFirstName: string;
    AccountLastName: string;
    AccountTipoDeDocumento?: string;
    AccountNumeroDeDocumento?: string;
    AccountPersonMobilePhone?: string;
    AccountPersonEmail?: string;
    AccountBillingAddress?: string;
    Account?: Account;
    TipoDeTrabajo?: string;
    Modelo?: string;
    Patente?: string;
    VIN: string;
    Kilometraje?: string;
    EsperaElVehiculo?: string;
    SchedStartTime?: string;
    SchedEndTime?: string;
    ServiceTerritoryName?: string;
    ServiceTerritoryId?: string;
    IdPreOrden?: string;
    FechaHoraEntregaVehiculo?: string;
    FechaHoraRecepcionVehiculo?: string;
    ClienteSinCitaPrevia?: string;
    FIR?: string;
    NoFIR?: string;
    NombreContacto?: string;
    ApellidoContacto?: string;
    EmailContacto?: string;
    CelularContacto?: string;
    Precio?: string;
    Marca?: string;
    Cancelado?: string;
    Asset?: Asset;
    Requerimiento?: Requerimiento[];
    AsesorCitas: string;
}

interface RequestBody {
    IdPeticion: string;
    WorkOrder: WorkOrder;
}

interface OutputBody {
    IdPreOrden: string;
    ResultadoProceso: string;
}
