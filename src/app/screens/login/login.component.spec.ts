import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login.component';

import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

describe('LoginComponent', () => {
  // Use .only to run only this suite
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;

  beforeEach(async () => {
    const authSpy = jasmine.createSpyObj('AuthService', ['findUser']);
    const routerMock = jasmine.createSpyObj('Router', ['navigate']);
    const cookieSpy = jasmine.createSpyObj('CookieService', ['set']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerMock },
        { provide: CookieService, useValue: cookieSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    cookieServiceSpy = TestBed.inject(
      CookieService
    ) as jasmine.SpyObj<CookieService>;

    fixture.detectChanges();
  });

  it('should call findUser and navigate on successful login', () => {
    const mockUser: User = {
      userId: '1',
      fullName: 'Test User',
      role: 'Admin',
    } as User;
    authServiceSpy.findUser.and.returnValue(of(mockUser));

    component.loginForm();

    expect(authServiceSpy.findUser).toHaveBeenCalledWith(component.userDetails);
    expect(cookieServiceSpy.set).toHaveBeenCalledWith('userId', '1');
    expect(cookieServiceSpy.set).toHaveBeenCalledWith('userRole', 'Admin');
    expect(cookieServiceSpy.set).toHaveBeenCalledWith('userName', 'Test User');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should show alert on user not found', () => {
    spyOn(window, 'alert');
    authServiceSpy.findUser.and.returnValue(of(null));

    component.loginForm();

    expect(authServiceSpy.findUser).toHaveBeenCalledWith(component.userDetails);
    expect(window.alert).toHaveBeenCalledWith('User Not Found');
  });
});
