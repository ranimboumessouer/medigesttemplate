export interface RendezVous {
  id?: number;
  dateHeure: string;  
  patient: number;    // id mridh
  medecin: number;    // id tbib idha rajaat f clinique
  statut?: 'prevu' | 'realise' | 'annule' | 'reporte'; 
}
