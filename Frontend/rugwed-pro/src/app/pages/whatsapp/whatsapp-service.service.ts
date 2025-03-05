import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WhatsappServiceService {

  constructor(private http:HttpClient,private router:Router  ) { }
  baseUrl:any = environment.baseUrl;


  login(data:any):Observable<any>
  {
      debugger
      return this.http.post(this.baseUrl + "auth/login",data);
  }

  createClient(data:any):Observable<any>
  {
    debugger
      return this.http.post(this.baseUrl+"addClient",data)
  }


  registerAdmin(data:any) :Observable<any>
  {
    debugger
      return this.http.post(this.baseUrl + "create",data)
  }

  uploadExcel(data:any):Observable<any>{
    debugger;
    return this.http.post(this.baseUrl+ "addClient", data)
  } 

  // selectClient(data:any):Observable<any>{
  //   return this.http.post(this.baseUrl+ "get-mstclient", data);
  // }

//for select client
  getMstClientData(userCode: number): Observable<any> {
    debugger;
    return this.http.get(this.baseUrl+ "get-mstclient", {
      params: { USER__CODE: userCode.toString() },
    });


  }
  profileUpdate(data:any):Observable<any>
  {
        return this.http.post(this.baseUrl+"editProfile",data)
  }

  getAdminData(data:any):Observable<any>
  {
        return this.http.post(this.baseUrl+"ProfileData",data)
  }


  getTemplates(data:any):Observable<any>
  {
    return this.http.post(this.baseUrl+"fetchTemplate",data);
  }


  sendMessage(data:any):Observable<any>
  {
    debugger;
    return this.http.post(this.baseUrl+"sendMessage",data)
  }


  getData(data:any):Observable<any>{
    return this.http.post(this.baseUrl + "getData", data);
  }


  getTemplateName(data:any):Observable<any>{
    return this.http.post(this.baseUrl + "getTemplateList", data);
  }

  
  scheduleMessage(data:any):Observable<any>{
    return this.http.post(this.baseUrl + "scheduleMessage", data);
  }

  getScheduedData():Observable<any>{
    return this.http.get(this.baseUrl + "scheduleData");
  }

  saveTemplate(data:any):Observable<any>
  {
    return this.http.post(this.baseUrl+"createTemplate",data);
  }


  notification():Observable<any>{

     return this.http.get(this.baseUrl + "notification");
  }

  //for clear

  updateNotification(CODE:any):Observable<any>{

     return this.http.post(this.baseUrl + "updateNotification",CODE)
  }



  //fetch category

  fetchCategories(userId: any): Observable<any> {
    return this.http.get(this.baseUrl + "fetchCategory", { params: { USERID: userId } });
  }


  //update category
  updateCategory(data:any):Observable<any>
  {
    return this.http.put(this.baseUrl + "updateCategory", data);
  }

  saveCategory(data:any):Observable<any>
  {
    return this.http.post(this.baseUrl + "addCategory", data);
  }
  deleteCategory(data:any):Observable<any>
  {
    debugger
    return this.http.delete(this.baseUrl + "deleteCategory", { params: { CODE: data } });
  }


template():Observable<any>{

    return this.http.get(this.baseUrl + "template");
}

}