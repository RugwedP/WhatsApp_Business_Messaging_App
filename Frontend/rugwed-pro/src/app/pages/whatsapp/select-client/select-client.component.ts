import {
  AfterViewChecked,
  Component,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { GridColumn } from "smart-webcomponents-angular";
import { GridModule } from "smart-webcomponents-angular/grid";
import { UIModule } from "src/app/shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { FullCalendarModule } from "@fullcalendar/angular"; // Import FullCalendar
import { Router } from "@angular/router";
import { WhatsappServiceService } from "../whatsapp-service.service";
import Swal from "sweetalert2";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-select-client",
  templateUrl: "./select-client.component.html",
  styleUrls: ["./select-client.component.css"],
  imports: [
    CommonModule,
    GridModule,
    UIModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    FullCalendarModule,
  ],
  standalone: true,
})
export class SelectClientComponent {
  // @ViewChild("clientSelectionModal") clientSelectionModal!: TemplateRef<any>;
  // modalRef?: BsModalRef;
  // breadCrumbItems: Array<{}>;
  // templateData: any;
  // tableData: any[] = [];
  // dataSource: any = [];
  // selectedMobileNumber: string | null = null; // To store the selected mobile number
  // selectedRowData: any;
  
  // responseTableData: any = {}
  // finalData: any = []

  // constructor(
  //   private router: Router,
  //   private service: WhatsappServiceService,
  //   private modalService: BsModalService,
  //   private cdr: ChangeDetectorRef
  // ) {
    

      // Retrieve template data from history.state
      // if (history.state.templateData) {
      //   this.templateData = history.state.templateData;
      //   console.log('Received Template Data:', this.templateData);
      // } else {
      //   console.log('No template data received');
      // }
  // }

  // ngOnInit() {
  //   debugger;
  //   this.breadCrumbItems = [
  //     { label: "Ecommerce" },
  //     { label: "Add Product", active: true },
  //   ];

  //   const userCode = parseInt(localStorage.getItem("userId"));
  //   this.service.getMstClientData(userCode).subscribe(
  //     (response) => {
  //       this.dataSource = response;
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.error("Error fetching client data:", error);
  //     }
  //   );
  // }

  // behavior = {
  //   allowColumnReorder: true,
  //   rowResizeMode: "growAndShrink",
  //   columnResizeMode: "growAndShrink",
  // };

  // header = { visible: true };
  // appearance = {
  //   alternationCount: 2,
  //   showRowHeader: true,
  //   showRowStatus: true,
  //   showRowHeaderSelectIcon: true,
  //   showRowHeaderFocusIcon: false,
  //   showColumnIcon: false,
  //   allowHover: true,
  //   showRowNumber: true,
  // };

  // columns: GridColumn[] = [
  //   { label: "CODE", dataField: "CODE" },
  //   { label: "Name", dataField: "CLI_NAME" },
  //   { label: "Phone Number", dataField: "MOBILE" },
  //   { label: "Category", dataField: "CATEGORY" },
  //   { label: "Location", dataField: "CLI_ADDRESS" },
  // ];

  // sorting = { enabled: true };
  // selection = {
  //   enabled: true,
  //   allowCellSelection: false,
  //   allowRowHeaderSelection: true,
  //   allowColumnHeaderSelection: true,
  //   mode: "many", // Change this from 'one' to 'many' to allow multiple row selection
  // };

  // filtering = { enabled: true };



  // selectedRowIndexes: number[] = []; // To store the selected row indexes
  // Edit() {
  //   const table: any = document.querySelector("smart-grid");

  //   // Ensure Smart Grid is accessible
  //   if (!table) {
  //     console.error("Smart Grid not found");
  //     return;
  //   }

  //   const selectedRows = table.getSelectedRows();

  //   if (!selectedRows || selectedRows.length === 0) {
  //     console.warn("No rows selected");
  //     return;
  //   }
  //   const fnalObject = {};

  //   console.log("8888888", selectedRows);

  //   const mob_Array: any[] = selectedRows.map((row, index) => {
  //     return {
  //       MOBILE: row[1].MOBILE,
  //       CODE: row[1].CODE,
  //       CLI_NAME: row[1].CLI_NAME,
  //     };
  //   });

  //   console.log("MOB NOS : ", mob_Array);

  //   const userId = localStorage.getItem("userId");
  //   const obj = {
  //     MOBILES: mob_Array,
  //     USERID: userId,
  //     TEMPLATE: this.templateData,
  //   };

  //   this.service.sendMessage(obj).subscribe(
  //     (res) => {
  //       debugger;

  //       console.log("Response:", res);
  //       this.responseTableData = res; // Store the response data for the modal
  //       console.log(" this.responseTableData", this.responseTableData);

  //       console.log("template data after sending message", this.templateData);
        
  //       // console.log(" this.responseTableData", this.responseTableData?.result);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Message Sent Successfully",
  //         confirmButtonText: "OK",
  //       }).then(() => {
  //         this.openClientSelectionModal(); // Open the modal after the Swal alert
  //       });

  //     },
  //     (err) => {
  //       console.error(err);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Message not sent",
  //       });
  //     }
  //   );





  // }
 
  // openClientSelectionModal() {
  //   debugger;
  //   // Ensure the modal is opened only after the data is assigned
  //   if (this.responseTableData) {
  //     this.modalService.show(this.clientSelectionModal);
  //   } else {
  //     console.warn("No data to display in the modal");
  //   }
  // }

  // closeClientSelectionModal() {
  //   this.modalService.hide();
  // }

  // goToTemplateSelection() {
  //   this.router.navigate(["/use-template"]);
  // }










  //ch4


  @ViewChild("clientSelectionModal") clientSelectionModal!: TemplateRef<any>;
  modalRef?: BsModalRef;
  breadCrumbItems: Array<{}>;
  templateData: any;
  tableData: any[] = [];
  dataSource: any = [];
  selectedMobileNumber: string | null = null; // To store the selected mobile number
  selectedRowData: any;
  
  responseTableData: any = {}
  finalData: any = []

  constructor(
    private router: Router,
    private service: WhatsappServiceService,
    private modalService: BsModalService,
    private cdr: ChangeDetectorRef
  ) {
    this.templateData = history.state.templateData;
    console.log("Received Template Data:", this.templateData);
    console.log("COde", this.templateData.code);
  }

  ngOnInit() {
    debugger;
    this.breadCrumbItems = [
      { label: "Ecommerce" },
      { label: "Add Product", active: true },
    ];

    const userCode = parseInt(localStorage.getItem("userId"));
    this.service.getMstClientData(userCode).subscribe(
      (response) => {
        this.dataSource = response;
        console.log(response);
      },
      (error) => {
        console.error("Error fetching client data:", error);
      }
    );
  }

  behavior = {
    allowColumnReorder: true,
    rowResizeMode: "growAndShrink",
    columnResizeMode: "growAndShrink",
  };

  header = { visible: true };
  appearance = {
    alternationCount: 2,
    showRowHeader: true,
    showRowStatus: true,
    showRowHeaderSelectIcon: true,
    showRowHeaderFocusIcon: false,
    showColumnIcon: false,
    allowHover: true,
    showRowNumber: true,
  };

  columns: GridColumn[] = [
    { label: "CODE", dataField: "CODE" },
    { label: "Name", dataField: "CLI_NAME" },
    { label: "Phone Number", dataField: "MOBILE" },
    { label: "Category", dataField: "CATEGORY" },
    { label: "Location", dataField: "CLI_ADDRESS" },
  ];

  sorting = { enabled: true };
  selection = {
    enabled: true,
    allowCellSelection: false,
    allowRowHeaderSelection: true,
    allowColumnHeaderSelection: true,
    mode: "many", // Change this from 'one' to 'many' to allow multiple row selection
  };

  filtering = { enabled: true };



  selectedRowIndexes: number[] = []; // To store the selected row indexes
  Edit() {
    const table: any = document.querySelector("smart-grid");

    // Ensure Smart Grid is accessible
    if (!table) {
      console.error("Smart Grid not found");
      return;
    }

    const selectedRows = table.getSelectedRows();

    if (!selectedRows || selectedRows.length === 0) {
      console.warn("No rows selected");
      return;
    }
    const fnalObject = {};

    console.log("8888888", selectedRows);

    const mob_Array: any[] = selectedRows.map((row, index) => {
      return {
        MOBILE: row[1].MOBILE,
        CODE: row[1].CODE,
        CLI_NAME: row[1].CLI_NAME,
      };
    });

    console.log("MOB NOS : ", mob_Array);

    const userId = localStorage.getItem("userId");
    const obj = {
      MOBILES: mob_Array,
      USERID: userId,
      CODE: this.templateData.code,
    };

    this.service.sendMessage(obj).subscribe(
      (res) => {
        debugger;

        console.log("Response:", res);
        this.responseTableData = res; // Store the response data for the modal
        console.log(" this.responseTableData", this.responseTableData);
        // console.log(" this.responseTableData", this.responseTableData?.result);
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
          confirmButtonText: "OK",
        }).then(() => {
          this.openClientSelectionModal(); // Open the modal after the Swal alert
        });

      },
      (err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Message not sent",
        });
      }
    );





  }
 
  openClientSelectionModal() {
    debugger;
    // Ensure the modal is opened only after the data is assigned
    if (this.responseTableData) {
      this.modalService.show(this.clientSelectionModal);
    } else {
      console.warn("No data to display in the modal");
    }
  }

  closeClientSelectionModal() {
    this.modalService.hide();
  }

  goToTemplateSelection() {
    this.router.navigate(["/use-template"]);
  }

}

