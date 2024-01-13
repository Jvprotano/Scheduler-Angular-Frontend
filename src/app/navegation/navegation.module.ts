import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { LocalStorageUtils } from "../utils/localstorage";

@NgModule({
    declarations: [],
    imports: [CommonModule, RouterModule, HttpClientModule],
    exports: [],
    providers: [LocalStorageUtils]
})

export class NavegationModule { }