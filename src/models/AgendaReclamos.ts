import { getServicesConnection } from '../config/database';

export interface ReclamosAttributes {
  Referencia: number;
  Item: number;
  Reclamo: string;
  Origen?: string;
  Tipo?: number;
  Categoria?: number;
  ComTecnico?: string;
  CausaRaiz?: string;
  InstTrabajo?: string;
  CtrlCalidad: boolean;
  CodOperario?: string;
  ComCalidad?: string;
  Que?: string;
  Cuando?: string;
  Frecuencia?: string;
  Condiciones?: string;
  TipoDeCamino?: string;
  ParteAuto?: string;
  ConfirmaCli: boolean;
  ConfirmaAsesor: boolean;
  ConfirmaTiempo: boolean;
  DescribirSintoma?: string;
  TpoEstimado: number;
  CorrespondeTD?: string;
  RutaTD?: string;
  PruebaEstatica?: string;
  Box?: string;
  InfoAdicional?: string;
  TipoUsoUnidad?: string;
}

export default class Reclamos {
  static async findAll(): Promise<ReclamosAttributes[]> {
    const servicesConnection = getServicesConnection();
    const result = await servicesConnection.query('SELECT * FROM AgendaReclamos');
    return result.map((row: any) => ({
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
  }

  static async findByReference(reference: number): Promise<ReclamosAttributes[]> {
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
  }

  static async create(reclamo: ReclamosAttributes, referencia:number): Promise<void> {
    const servicesConnection = getServicesConnection();
    const sql = 'INSERT INTO AgendaReclamos (Referencia, Item, Reclamo, Origen, Tipo, Categoria, ComTecnico, CausaRaiz, InstTrabajo, CtrlCalidad, CodOperario, ComCalidad, Que, Cuando, Frecuencia, Condiciones, TipoDeCamino, ParteAuto, ConfirmaCli, ConfirmaAsesor, ConfirmaTiempo, DescribirSintoma, TpoEstimado, CorrespondeTD, RutaTD, PruebaEstatica, Box, InfoAdicional, TipoUsoUnidad)'
        + `VALUES (${referencia},(SELECT ISNULL(MAX(Item), 0) + 1 AS NewItem FROM AgendaReclamos WHERE Referencia = ${referencia}),'${reclamo.Reclamo}',null,null,${reclamo.Categoria},'${reclamo.ComTecnico}',`
        + `'${reclamo.CausaRaiz}','${reclamo.InstTrabajo}',${reclamo.CtrlCalidad ? 1 : 0},'${reclamo.CodOperario}','${reclamo.ComCalidad}',`
        + `'${reclamo.Que}','${reclamo.Cuando}','${reclamo.Frecuencia}','${reclamo.Condiciones}','${reclamo.TipoDeCamino}','${reclamo.ParteAuto}',`
        + `${reclamo.ConfirmaCli ? 1 : 0},${reclamo.ConfirmaAsesor ? 1 : 0},${reclamo.ConfirmaTiempo ? 1 : 0},'${reclamo.DescribirSintoma}',`
        + `${reclamo.TpoEstimado},'${reclamo.CorrespondeTD}','${reclamo.RutaTD}','${reclamo.PruebaEstatica}','${reclamo.Box}','${reclamo.InfoAdicional}','${reclamo.TipoUsoUnidad}');`;
    await servicesConnection.query(sql);
  }

  static async update(reference: number, item: number, reclamo: Partial<Omit<ReclamosAttributes, 'Referencia' | 'Item'>>): Promise<void> {
    const servicesConnection = getServicesConnection();
    const updates = Object.entries(reclamo).map(([key, value]) => `${key} = '${value}'`).join(', ');
    const sql = `UPDATE AgendaReclamos SET ${updates} WHERE Referencia = ${reference} AND Item = ${item}`;
    await servicesConnection.query(sql);
  }

  static async deleteAllByReference(reference: number): Promise<void> {
    const servicesConnection = getServicesConnection();
    const sql = `DELETE FROM AgendaReclamos WHERE Referencia = ${reference}`;
    await servicesConnection.query(sql);
  }
}
