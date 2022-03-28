import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { HeaderComponent } from './component/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppGuard } from './app.guard';
import { PostManagementComponent } from './post-management/post-management.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { UserDetailComponent } from './user-management/user-detail/user-detail.component';
import { PostDetailComponent } from './post-management/post-detail/post-detail.component';
import { StaticContentComponent } from './static-content/static-content.component';
import { EditStaticContentComponent } from './static-content/edit-static-content/edit-static-content.component';
import { EditProfileComponent } from './my-profile/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
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
import { ViewSubAdminManagementComponent } from './sub-admin-management/view-sub-admin-management/view-sub-admin-management.component';
import { SubAdminManagementComponent } from './sub-admin-management/sub-admin-management.component';
import { AccountingComponent } from './accounting/accounting.component';
import { OrderReportManagementComponent } from './order-report-management/order-report-management.component';
import { RatingUserTypeManagementComponent } from './rating-user-type-management/rating-user-type-management.component';
import { DeliveryPersionDetailComponent } from './delivery-persion-management/delivery-persion-detail/delivery-persion-detail.component';
import { ProfessionalWorkerDetailComponent } from './professional-worker-management/professional-worker-detail/professional-worker-detail.component';
import { AuthGuard } from './auth.guard';
import { GraphManagementComponent } from './graph-management/graph-management.component';
import { CurrencyProfessionalManagementComponent } from './currency-professional-management/currency-professional-management.component';
import { ActionManagementComponent } from './action-management/action-management.component';
import { AddReportReasonComponent } from './add-report-reason/add-report-reason.component';
import { ViewOfferListComponent } from './view-offer-list/view-offer-list.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CuisineManagementComponent } from './cuisine-management/cuisine-management.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
import { ProductSubcategoryComponent } from './product-subcategory/product-subcategory.component';
import { StoreComponent } from './store/store.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { StoreResDetailComponent } from './store-res-detail/store-res-detail.component';
import { DriverComponent } from './driver/driver.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';
import { CommissionComponent } from './commission/commission.component';
import { ProductOrderComponent } from './product-order/product-order.component';
import { ProductOrderDetailComponent } from './product-order-detail/product-order-detail.component';
import { MainServiceComponent } from './main-service/main-service.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { OfferBannerComponent } from './offer-banner/offer-banner.component';
import { StoryComponent } from './story/story.component';
import { PaymentManagementComponent } from './payment-management/payment-management.component';
import { StoreTypeComponent } from './store-type/store-type.component';
import { StoreCategoryComponent } from './store-category/store-category.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "forgotPassword", component: ForgotPasswordComponent },
  { path: "header", component: HeaderComponent },
  { path: "dashboard", component: DashboardComponent },
  {
    path: "admin", component: SidebarComponent,
    children: [
      { path: "dashboard", component: DashboardComponent, canActivate: [AppGuard] },
      { path: "postManagement/:type", component: PostManagementComponent, canActivate: [AppGuard] },
      { path: "userManagement", component: UserManagementComponent, canActivate: [AppGuard] },
      { path: "userTypeManagement", component: UserTypeManagementComponent, canActivate: [AppGuard] },
      { path: "deliverPersionManagement", component: DeliveryPersionManagementComponent, canActivate: [AppGuard] },
      { path: "professionalworkerManagement/:type", component: ProfessionalWorkerManagementComponent, canActivate: [AppGuard] },
      { path: "postUserTypeManagement", component: PostUserTypeManagementComponent, canActivate: [AppGuard] },
      { path: "accountingManagement", component: AccountingComponent, canActivate: [AppGuard] },
      { path: "subAdminDetails/:id", component: ViewSubAdminManagementComponent, canActivate: [AppGuard] },
      { path: "subAdminManagement", component: SubAdminManagementComponent, canActivate: [AppGuard] },
      { path: "orderReportManagement", component: OrderReportManagementComponent, canActivate: [AppGuard] },
      { path: "deliverWorkerDetails/:id", component: DeliveryPersionDetailComponent, canActivate: [AppGuard] },
      { path: "professionalWorkerDetails/:id", component: ProfessionalWorkerDetailComponent, canActivate: [AppGuard] },
      { path: "userDetails/:id", component: UserDetailComponent, canActivate: [AppGuard] },
      { path: "postDetails/:id", component: PostDetailComponent, canActivate: [AppGuard] },
      { path: "categoryDetails/:id", component: ShowCategoryComponent, canActivate: [AppGuard] },
      { path: "subCategoryDetails/:id", component: ShowSubcategoryManagementComponent, canActivate: [AppGuard] },
      { path: "reportDetails/:id", component: ReportDetailComponent, canActivate: [AppGuard] },
      { path: "staticContent", component: StaticContentComponent, canActivate: [AppGuard] },
      { path: "editStaticContent/:id", component: EditStaticContentComponent, canActivate: [AppGuard] },
      { path: "myProfile", component: MyProfileComponent, canActivate: [AppGuard] },
      { path: "editProfile", component: EditProfileComponent, canActivate: [AppGuard] },
      { path: "reportManagement", component: ReportManagementComponent, canActivate: [AppGuard] },
      { path: "settingManagement", component: SettingComponent, canActivate: [AppGuard] },
      { path: "categoryManagement", component: CategoryManagementComponent, canActivate: [AppGuard] },
      { path: "graphManagement", component: GraphManagementComponent, canActivate: [AppGuard] },
      { path: "ratingManagement", component: RatingManagementComponent, canActivate: [AppGuard] },
      { path: "ratingTypeManagement", component: RatingUserTypeManagementComponent, canActivate: [AppGuard] },
      { path: "professionalCurrencyTaxManagement", component: CurrencyProfessionalManagementComponent, canActivate: [AppGuard] },
      { path: "actionManagement", component: ActionManagementComponent, canActivate: [AppGuard] },
      { path: "addReportReasonManagement", component: AddReportReasonComponent, canActivate: [AppGuard] },
      { path: "viewOfferListManagement/:id", component: ViewOfferListComponent, canActivate: [AppGuard] },
      { path: "cuisine", component: CuisineManagementComponent, canActivate: [AppGuard] },
      { path: "productCategory", component: ProductCategoryComponent, canActivate: [AppGuard] },
      { path: "productSubCategory/:id", component: ProductSubcategoryComponent, canActivate: [AppGuard] },
      { path: "store/:id", component: StoreComponent, canActivate: [AppGuard] },
      { path: "restaurant/:id", component: RestaurantComponent, canActivate: [AppGuard] },
      { path: "driver/:id", component: DriverComponent, canActivate: [AppGuard] },
      { path: "commission", component: CommissionComponent, canActivate: [AppGuard] },
      { path: "resStoreDetail/:id", component: StoreResDetailComponent, canActivate: [AppGuard] },
      { path: "driverDetail/:id", component: DriverDetailComponent, canActivate: [AppGuard] },
      { path: "orderProductDetail/:id", component: ProductOrderDetailComponent, canActivate: [AppGuard] },
      { path: "orderProduct", component: ProductOrderComponent, canActivate: [AppGuard] },
      { path: "mainService", component: MainServiceComponent, canActivate: [AppGuard] },
      { path: "banner", component: HomeBannerComponent, canActivate: [AppGuard] },
      { path: "bannerOffer", component: OfferBannerComponent, canActivate: [AppGuard] },
      { path: "story", component: StoryComponent, canActivate: [AppGuard] },
      { path: "payment", component: PaymentManagementComponent, canActivate: [AppGuard] },
      { path: "storeType", component: StoreTypeComponent, canActivate: [AppGuard] },
      { path: "storeCategory/:id", component: StoreCategoryComponent, canActivate: [AppGuard] },

      { path: '**', redirectTo: 'admin/dashboard', pathMatch: 'full' },
    ]
  },
  { path: '**', redirectTo: 'admin/dashboard', pathMatch: 'full' },

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  // providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }]
})



export class AppRoutingModule { }
