import { ChangeDetectorRef, Component } from '@angular/core';
import { GridColumn } from "smart-webcomponents-angular";
import { GridModule } from "smart-webcomponents-angular/grid";
// import { UIModule } from "src/app/shared/ui/ui.module";
import { FormGroup, FormsModule, ReactiveFormsModule,FormBuilder } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { CommonModule } from "@angular/common";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { WhatsappServiceService } from '../whatsapp-service.service';
import { UIModule } from "../../../shared/ui/ui.module";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
  standalone:true,
  imports: [
    CommonModule,
    GridModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    UIModule
]
})
export class AddCategoryComponent {


  // modalRef?: BsModalRef;
  breadCrumbItems: Array<{}>;
  templateData: any;
  tableData: any[] = [];
  dataSource: any = [];
   fnalObject = {};
  selectedMobileNumber: string | null = null; // To store the selected mobile number
  selectedRowData: any;
  btnText:string = "Add"
  responseTableData: any = {}
  finalData: any = []
  submit: boolean;
  isDisplay:boolean = false
  showEditBtn:boolean = false
  isCategoryShowing:boolean = false
  productForm:FormGroup
  categoryCode:any
  categoryName:any
  constructor(
    public formBuilder:FormBuilder,
    private router: Router,
    private service: WhatsappServiceService,
    // private modalService: BsModalService,
    private cdr: ChangeDetectorRef
  ) {
    // this.templateData = history.state.templateData;
    // console.log("Received Template Data:", this.templateData);
    // console.log("COde", this.templateData.code);
  }

  ngOnInit() {
    debugger;
   
    this.productForm = this.formBuilder.group({
      name:['']
    })

    const userCode = parseInt(localStorage.getItem("userId"));
    this.service.fetchCategories(userCode).subscribe(
      (response) => {
        this.dataSource = response;
        console.log("*****",response);
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
    { label: "Category Name", dataField: "NAME" },
    
  ];

  sorting = { enabled: true };
  selection = {
    enabled: true,
    allowCellSelection: false,
    allowRowHeaderSelection: true,
    allowColumnHeaderSelection: true,
    mode: "many", 
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
      Swal.fire({
              icon: "error",
              title: "No row selected",
            });
      return;
    }
    
    else
   
    {
      // this.isDisplay = true;  
      // this.btnText = "Edit"; 
      this.isCategoryShowing = true
      this.showEditBtn = true
      this.isDisplay = false
      this.productForm.patchValue({
        name:selectedRows[0][1].NAME
      })
      this.btnText = "Edit"

       const userId = localStorage.getItem("userId");
  
      this.categoryCode = selectedRows[0][1].CODE,
      this.categoryName=selectedRows[0][1].NAME
     

      
   


    }
   

    console.log("8888888", selectedRows);
    console.log("****",selectedRows[0][1]);

  
    

    // const mob_Array: any[] = selectedRows.map((row, index) => {
    //   return {
    //     MOBILE: row[1].MOBILE,
    //     CODE: row[1].CODE,
    //     CLI_NAME: row[1].CLI_NAME,
    //   };
    // });

    // console.log("MOB NOS : ", mob_Array);

    // const userId = localStorage.getItem("userId");
    // const obj = {
    //   MOBILES: mob_Array,
    //   USERID: userId,
    //   CODE: this.templateData.code,
    // };

    // this.service.sendMessage(obj).subscribe(
    //   (res) => {
    //     debugger;

    //     console.log("Response:", res);
    //     this.responseTableData = res; // Store the response data for the modal
    //     console.log(" this.responseTableData", this.responseTableData);
    //     // console.log(" this.responseTableData", this.responseTableData?.result);
    //     Swal.fire({
    //       icon: "success",
    //       title: "Message Sent Successfully",
    //       confirmButtonText: "OK",
    //     }).then(() => {
    //       // this.openClientSelectionModal(); // Open the modal after the Swal alert
    //     });

    //   },
    //   (err) => {
    //     console.error(err);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Message not sent",
    //     });
    //   }
    // );





  }
 
 

  saveCategory()
  {
    debugger;
      const userId = localStorage.getItem("userId");

      const category = this.productForm.get("name").value
    const obj = {
      // USERID: mob_Array,
      USERID: userId,
      CATEGORY: category,
    };

    this.service.saveCategory(obj).subscribe(
      (res) => {
        debugger;

        console.log("Response:", res);
        this.responseTableData = res; // Store the response data for the modal
     
        Swal.fire({
          icon: "success",
          title: "Category Saved Successfully",
          confirmButtonText: "OK",
        }).then(() => {
          this.service.fetchCategories(localStorage.getItem("userId")).subscribe(res=>{
            console.log("#####",res)
            this.dataSource = res;
          })
        });

      },
      (err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Category Not Saved",
        });
      }
    );
  }

  addCategory() {
    // this.isDisplay = true;  
    this.isCategoryShowing = true
    this.showEditBtn = false
   this.isDisplay = true
    this.productForm.reset(); // Clear input field
  }

  updateCategory()
  {
    debugger
      const category = this.productForm.get("name").value
    const obj = {
      CODE:this.categoryCode,
      CATEGORY: category
    };

    this.service.updateCategory(obj).subscribe(
      (res) => {
        debugger;

        console.log(res, res);
        
     
        Swal.fire({
          icon: "success",
          title: "Category Updated Successfully",
          confirmButtonText: "OK",
        }).then(() => {
          this.service.fetchCategories(localStorage.getItem("userId")).subscribe(res=>{
            console.log("#####",res)
            this.dataSource = res;
          })
        });

      },
      (err) => {
        // console.error(err);
        Swal.fire({
          icon: "error",
          title: "Category Not Updated",
        });
      }
    );
  }


 
  deleteCategory() {
    const table: any = document.querySelector("smart-grid");
  
    debugger;
    // Ensure Smart Grid is accessible
    if (!table) {
      console.error("Smart Grid not found");
      return;
    }
  
    const selectedRows = table.getSelectedRows();
  
    if (!selectedRows || selectedRows.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No row selected",
      });
      return;
    } else {
      const CODE = selectedRows[0][1].CODE;
  
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to delete this category!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteCategory(CODE).subscribe(
            (res) => {
              console.log("Category deleted:", res);
              Swal.fire({
                title: "Deleted!",
                text: "Your category has been deleted.",
                icon: "success",
              });
  
              // Refresh categories after deletion
              this.service.fetchCategories(localStorage.getItem("userId")).subscribe(
                (res) => {
                  console.log("Updated categories:", res);
                  this.dataSource = res;
                },
                (err) => {
                  console.error("Error fetching categories:", err);
                  Swal.fire({
                    icon: "error",
                    title: "Failed to refresh categories",
                  });
                }
              );
            },
            (err) => {
              console.error("Error deleting category:", err);
              Swal.fire({
                icon: "error",
                title: "Category Not Deleted",
              });
            }
          );
        }
      });
    }
  }
  
    
    
}

  

