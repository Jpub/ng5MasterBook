import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpModule,
  Http
} from '@angular/http';

import { AnalyticsDemoComponent } from './analytics-demo.component';
import {
  Metric,
  AnalyticsImplementation
} from './analytics-demo.interface';
import { AnalyticsService } from '../services/analytics.service';

describe('AnalyticsDemoComponent', () => {
  let component: AnalyticsDemoComponent;
  let fixture: ComponentFixture<AnalyticsDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ AnalyticsDemoComponent ],
      providers: [
        { provide: 'API_URL', useValue: 'http://devserver.com' },
        {
          provide: AnalyticsService,

          // add our `deps` to specify the factory depencies
          deps: [ Http, 'API_URL' ],

          // notice we've added arguments here
          // the order matches the deps order
          useFactory(http: Http, apiUrl: string) {

            // create an implementation that will log the event
            const loggingImplementation: AnalyticsImplementation = {
              recordEvent: (metric: Metric): void => {
                console.log('The metric is:', metric);
                console.log('Sending to: ', apiUrl);
                // ... You'd send the metric using http here ...
              }
            };

            // create our new `AnalyticsService` with the implementation
            return new AnalyticsService(loggingImplementation);
          }
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
