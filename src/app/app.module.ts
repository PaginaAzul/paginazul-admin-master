import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ng2-ckeditor';
import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HeaderComponent } from './component/header/header.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { PostManagementComponent } from './post-management/post-management.component';
import { StaticContentComponent } from './static-content/static-content.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { EditProfileComponent } from './my-profile/edit-profile/edit-profile.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';
import { PostDetailComponent } from './post-management/post-detail/post-detail.component';
import { EditStaticContentComponent } from './static-content/edit-static-content/edit-static-content.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { EmbedVideo } from 'ngx-embed-video';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReportManagementComponent } from './report-management/report-management.component';
import { ReportDetailComponent } from './report-management/report-detail/report-detail.component';
import { RatingManagementComponent } from './rating-management/rating-management.component';
import { SettingComponent } from './setting/setting.component';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { ShowCategoryComponent } from './category-management/show-category/show-category.component';
import { ShowSubcategoryManagementComponent } from './category-management/show-subcategory-management/show-subcategory-management.component';
import { UserTypeManagementComponent } from './user-type-management/user-type-management.component';
import { DeliveryPersionManagementComponent } from './delivery-persion-management/delivery-persion-management.component';
import { ProfessionalWorkerManagementComponent } from './professional-worker-management/professional-worker-management.component';
import { PostUserTypeManagementComponent } from './post-user-type-management/post-user-type-management.component';
import { SubAdminManagementComponent } from './sub-admin-management/sub-admin-management.component';
import { ViewSubAdminManagementComponent } from './sub-admin-management/view-sub-admin-management/view-sub-admin-management.component';
import { AccountingComponent } from './accounting/accounting.component';
import { OrderReportManagementComponent } from './order-report-management/order-report-management.component';
import { RatingUserTypeManagementComponent } from './rating-user-type-management/rating-user-type-management.component';
import { DeliveryPersionDetailComponent } from './delivery-persion-management/delivery-persion-detail/delivery-persion-detail.component';
import { ProfessionalWorkerDetailComponent } from './professional-worker-management/professional-worker-detail/professional-worker-detail.component';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { GraphManagementComponent } from './graph-management/graph-management.component';
import { CurrencyProfessionalManagementComponent } from './currency-professional-management/currency-professional-management.component';
import { ActionManagementComponent } from './action-management/action-management.component';
import { AddReportReasonComponent } from './add-report-reason/add-report-reason.component';
import { ViewOfferListComponent } from './view-offer-list/view-offer-list.component';
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);
import { MomentModule } from 'angular2-moment';
import { CookieService } from 'ngx-cookie-service';
import { CuisineManagementComponent } from './cuisine-management/cuisine-management.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductSubcategoryComponent } from './product-subcategory/product-subcategory.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { StoreComponent } from './store/store.component';
import { DriverComponent } from './driver/driver.component';
import { StoreResDetailComponent } from './store-res-detail/store-res-detail.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';
import { CommissionComponent } from './commission/commission.component';
import { ProductOrderComponent } from './product-order/product-order.component';
import { ProductOrderDetailComponent } from './product-order-detail/product-order-detail.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { MainServiceComponent } from './main-service/main-service.component';
import { OfferBannerComponent } from './offer-banner/offer-banner.component';
import { StoryComponent } from './story/story.component';
import { PaymentManagementComponent } from './payment-management/payment-management.component';
import { StoreTypeComponent } from './store-type/store-type.component';
import { StoreCategoryComponent } from './store-category/store-category.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    UserManagementComponent,
    PostManagementComponent,
    StaticContentComponent,
    MyProfileComponent,
    EditProfileComponent,
    UserDetailComponent,
    PostDetailComponent,
    EditStaticContentComponent,
    ReportManagementComponent,
    ReportDetailComponent,
    RatingManagementComponent,
    SettingComponent,
    CategoryManagementComponent,
    ShowCategoryComponent,
    ShowSubcategoryManagementComponent,
    UserTypeManagementComponent,
    DeliveryPersionManagementComponent,
    ProfessionalWorkerManagementComponent,
    PostUserTypeManagementComponent,
    SubAdminManagementComponent,
    ViewSubAdminManagementComponent,
    AccountingComponent,
    OrderReportManagementComponent,
    RatingUserTypeManagementComponent,
    DeliveryPersionDetailComponent,
    ProfessionalWorkerDetailComponent,
    GraphManagementComponent,
    CurrencyProfessionalManagementComponent,
    ActionManagementComponent,
    AddReportReasonComponent,
    ViewOfferListComponent,
    CuisineManagementComponent,
    ProductCategoryComponent,
    ProductSubcategoryComponent,
    RestaurantComponent,
    StoreComponent,
    DriverComponent,
    StoreResDetailComponent,
    DriverDetailComponent,
    CommissionComponent,
    ProductOrderComponent,
    ProductOrderDetailComponent,
    HomeBannerComponent,
    MainServiceComponent,
    OfferBannerComponent,
    StoryComponent,
    PaymentManagementComponent,
    StoreTypeComponent,
    StoreCategoryComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressAnimation: "decreasing",
      newestOnTop: true,
      maxOpened: 3,
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxSpinnerModule,
    NgxLoadingModule,
    Ng4LoadingSpinnerModule,
    NgxPaginationModule,
    NgbModule,
    CKEditorModule,
    FusionChartsModule,
    EmbedVideo.forRoot(),
  ],
  providers: [
    AuthGuard,
    CookieService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
