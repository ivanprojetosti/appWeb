//ionic g class symptoms/shared/symptoms 
//ARQUIVO SYMPTOMS.SERVICE.TS
export interface Symptoms{
name: string;
description: string;
imgUrl: string;     // url da imagem
filePatch: string;  // caminho da imagem no Storage

}