import { convertToGMT3, formatDate, formatDateSlashed } from '../components/agenda/agenda.utils';
import { getServicesConnection } from '../config/database';

export interface AgendaDiasAttributes {
    CodTaller: string;
    Dia: Date;
    Item: number;
    Referencia: number;
    MotivoBaja: string;
    FechaBaja: Date;
    UsuarioBaja: string;
}

export default class AgendaDias {
  static async findAll(): Promise<AgendaDiasAttributes[]> {
    const servicesConnection = getServicesConnection();
    const result = await servicesConnection.query('SELECT * FROM AgendaDias');
    return result.map((row: any) => ({
      CodTaller: row.CodTaller,
      Dia: row.Dia,
      Item: row.Item,
      Referencia: row.Referencia,
      MotivoBaja: row.MotivoBaja,
      FechaBaja: row.FechaBaja,
      UsuarioBaja: row.UsuarioBaja
    }));
  }

  /*static async findByReference(reference: number): Promise<ReclamosAttributes[]> {
    const servicesConnection = getServicesConnection();
    const result = await servicesConnection.query(`SELECT * FROM AgendaReclamos WHERE Referencia = ${reference}`) as ReclamosAttributes[];
    if (result.length === 0) return [];
    return result.map((row: ReclamosAttributes) => ({
      Referencia: row.Referencia,
      Item: row.Item,
      Reclamo: row.Reclamo,
      Origen: row.Origen,
      Tipo: row.Tipo,
      Categoria: row.Categoria,
      ComTecnico: row.ComTecnico,
      CausaRaiz: row.CausaRaiz,
      InstTrabajo: row.InstTrabajo,
      CtrlCalidad: !!row.CtrlCalidad,
      CodOperario: row.CodOperario,
      ComCalidad: row.ComCalidad,
      Que: row.Que,
      Cuando: row.Cuando,
      Frecuencia: row.Frecuencia,
      Condiciones: row.Condiciones,
      TipoDeCamino: row.TipoDeCamino,
      ParteAuto: row.ParteAuto,
      ConfirmaCli: !!row.ConfirmaCli,
      ConfirmaAsesor: !!row.ConfirmaAsesor,
      ConfirmaTiempo: !!row.ConfirmaTiempo,
      DescribirSintoma: row.DescribirSintoma,
      TpoEstimado: row.TpoEstimado,
      CorrespondeTD: row.CorrespondeTD,
      RutaTD: row.RutaTD,
      PruebaEstatica: row.PruebaEstatica,
      Box: row.Box,
      InfoAdicional: row.InfoAdicional,
      TipoUsoUnidad: row.TipoUsoUnidad,
    }));
  }*/

  static async create(agendaDia: AgendaDiasAttributes): Promise<void> {
    const servicesConnection = getServicesConnection();
    const sqlGetMaxItem = `SELECT COALESCE(MAX(Item), 0) + 1 as NextItem FROM AgendaDias WHERE CodTaller = ${agendaDia.CodTaller} AND Dia = '${formatDate(agendaDia.Dia?.toISOString())}'`;
    const [item] = await servicesConnection.query(sqlGetMaxItem) as { NextItem: number }[];

    const sql = 'INSERT INTO AgendaDias (CodTaller, Dia, Item, Referencia, MotivoBaja, FechaBaja, UsuarioBaja)'
        + `VALUES (${agendaDia.CodTaller}, '${formatDate(agendaDia.Dia?.toISOString())}',${item.NextItem},'${agendaDia.Referencia}',null,null,null);`;
    await servicesConnection.query(sql);
  }

  static async updateAgendaDia(agendaDia: AgendaDiasAttributes): Promise<void> {
    const servicesConnection = getServicesConnection();
    const sqlup = `UPDATE AgendaDias set MotivoBaja = 'Cambio de fecha(${formatDateSlashed(agendaDia.Dia?.toISOString())}).', `
    + `FechaBaja = '${convertToGMT3(new Date().toISOString())}', `
    + `UsuarioBaja = 'SALESFORCE' `
    + `WHERE Referencia = ${agendaDia.Referencia} and MotivoBaja is null and FechaBaja is null`;
    await servicesConnection.query(sqlup);

    const sqlGetMaxItem = `SELECT COALESCE(MAX(Item), 0) + 1 as NextItem FROM AgendaDias WHERE CodTaller = ${agendaDia.CodTaller} AND Dia = '${formatDate(agendaDia.Dia?.toISOString())}'`;
    const [item] = await servicesConnection.query(sqlGetMaxItem) as { NextItem: number }[];

    const sql = 'INSERT INTO AgendaDias (CodTaller, Dia, Item, Referencia, MotivoBaja, FechaBaja, UsuarioBaja)'
        + `VALUES (${agendaDia.CodTaller}, '${formatDate(agendaDia.Dia?.toISOString())}',${item.NextItem},'${agendaDia.Referencia}',null,null,null);`;
    await servicesConnection.query(sql);
  }

  static async deleteAgendaDia(reference: number): Promise<void> {
    const servicesConnection = getServicesConnection();
    const sqldel = `UPDATE AgendaDias set MotivoBaja = 'Turno cancelado.', `
    + `FechaBaja = '${convertToGMT3(new Date().toISOString())}', `
    + `UsuarioBaja = 'SALESFORCE' `
    + `WHERE Referencia = ${reference} and MotivoBaja is null and FechaBaja is null`;
    await servicesConnection.query(sqldel);
  }
}
