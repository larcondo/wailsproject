// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {main} from '../models';

export function CreateTodo(arg1:string,arg2:number):Promise<main.TodoEntry>;

export function DeletePermanently(arg1:Array<number>):Promise<Array<number>>;

export function DeleteTodo(arg1:number):Promise<main.TodoEntry>;

export function GetAllTodos():Promise<Array<main.TodoEntry>>;

export function GetDeleted():Promise<Array<main.TodoEntry>>;

export function Greet(arg1:string):Promise<string>;

export function UpdateCompleted(arg1:number,arg2:boolean):Promise<main.TodoEntry>;
