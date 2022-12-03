import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { CalendarView, CalendarModule, CalendarEvent, CalendarEventTimesChangedEvent, CalendarEventAction } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import Swal from 'sweetalert2'

import { isSameDay, isSameMonth, addHours,} from 'date-fns';

import { NgbModal, ModalDismissReasons, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateModel } from '../../models/date.model';

/*Changing the lenguage*/
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  locale: string = "es";

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  @ViewChild('newDateContent', { static: true }) newDateContent : TemplateRef<any>;
  @ViewChild('editDateContent', { static: true }) editDateContent : TemplateRef<any>;

  newEventForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  editEventForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
  });

  viewDate: Date = new Date();

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  refresh: Subject<any> = new Subject();

  mockDate = {};
  mockTime = {};

  events: CalendarEvent[] = [/*{
    start: startOfDay(new Date()),
    title: 'Un evento cualquiera'
  }*/]

  currentEvent: CalendarEvent = {
      title: '',
      start: new Date(),
      end: new Date(),
      color: {
        primary: '	#00FFFF',
        secondary: '	#00FFFF'
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
  }

  closeResult = '';

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  activeDayIsOpen: boolean = true;

  timeStart = {hour: 10, minute: 9};
  timeEnd = {hour: 11, minute: 9}

  fecha: NgbDateStruct;
  color = "#000000";

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        //console.log(event);
        //this.handleEvent('Edited', event);
        this.modalService.open(this.editDateContent);
        this.currentEvent = event;
        var splitted = event.start.toLocaleDateString().split("/",4);
        //console.log(splitted);
        var currentStartTime = event.start.toLocaleTimeString().split(":",3);
        var currentEndTime = event.end.toLocaleTimeString().split(":",3);
        //console.log(currentStartTime);
        this.mockDate = event.start.toLocaleDateString();
        this.mockDate={year:Number(splitted[2]),month:Number(splitted[1]),day:Number(splitted[0])}
        this.mockTime = event.start.toLocaleTimeString();
        //console.log(currentStartTime);
        this.timeStart.hour = Number(currentStartTime[0]);
        this.timeStart.minute = Number(currentStartTime[1]);

        this.timeEnd.hour = Number(currentEndTime[0]);
        this.timeEnd.minute = Number(currentEndTime[1]);

        console.log(event.id);
        this.fnUpdate(event.id);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    }
  ];

  constructor(
    private modalService: NgbModal,
    public modal: NgbModal,
  ) { }

  /*Testing some stuff for the id in the events*/
  count = 0;

  ngOnInit(): void {
    this.fnLoadEvents();
    /*Testing some stuff for the id in the events*/
    if(localStorage.getItem('count')){
      this.count = Number(localStorage.getItem('count'));
    }
    else{
      localStorage.setItem('count',this.count.toString());
    }
    
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(event);
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent):void{

  }

  onSubmit()
  {
    console.log(this.newEventForm.value);

    this.fnCheckDataForEvent(); //Checks if a date, time and color have been pick or not.

    this.modalService.dismissAll(); //Hides the modal
    console.log(this.newEventForm.value.name);
    console.log(this.newEventForm.value.description);
    let obj = {
      fecha : this.fecha,
      horaInicio: {
        hour: this.timeStart.hour,
        minute: this.timeStart.minute
      },
      horaFin: {
        hour: this.timeEnd.hour,
        minute: this.timeEnd.minute
      }
    };
    let data : CalendarEvent = {
      title: this.newEventForm.value.name + ' - ' + this.newEventForm.value.description,
      start: this.fnGetDateFormat(true,obj),
      end: this.fnGetDateFormat(false,obj),
      color: {
        primary: this.color,
        secondary: this.color
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      /*Adding data*/
      id: this.count,
      actions: this.actions
    };
    /*Testing some stuff for the id*/
    this.count += 1;
    console.log(this.count);
    localStorage.removeItem('count');
    localStorage.setItem('count',(this.count++).toString());

    //console.log(data);
    //console.log(obj);
    this.fecha = null;
    this.timeStart = {hour: 10, minute: 9};
    this.timeEnd = {hour: 11, minute: 9};
    this.color = "#000000";
    this.newEventForm.value.name = "";
    this.newEventForm.value.description = "";

    this.events.push(data);
    this.refresh.next();
  
    this.fnUpdateLocalStorage();
    
  }

  fnUpdateLocalStorage(){
    localStorage.removeItem("events");
    localStorage.setItem("events", JSON.stringify(this.events));
  }

  fnAddDate(){

  }

  fnGetDateFormat(start: boolean, fecha:DateModel): Date{
    let year = fecha.fecha.year;
    let month = fecha.fecha.month;
    let day = fecha.fecha.day;
    let hora;
    let minuto;
    if(start){
      hora = fecha.horaInicio.hour;
      minuto = fecha.horaInicio.minute;
    }else{
      hora = fecha.horaFin.hour;
      minuto = fecha.horaFin.minute;
    }
    let date = year + '/' + month + '/' + day + ' ' + hora + ':' + minuto;
    return new Date(date);
  }

  fnLoadEvents(){
    let events = JSON.parse(localStorage.getItem("events") || "[]");
    if(events != undefined){
      events.forEach(element => {
        element.start = new Date(element.start);
        element.end = new Date(element.end);
        element.actions = this.actions;
        console.log(element);
        this.events.push(element);
        this.refresh.next();
      });
    }
  }

  fnCheckDataForEvent(){
  }

  fnUpdate(id){
    //console.log(this.events);
    //console.log(this.editEventForm);
    let event = this.events.find(e => e.id == id);

    let obj = {
      fecha : this.fecha,
      horaInicio: {
        hour: this.timeStart.hour,
        minute: this.timeStart.minute
      },
      horaFin: {
        hour: this.timeEnd.hour,
        minute: this.timeEnd.minute
      }
    };

    let data : CalendarEvent = {
      title: this.newEventForm.value.name + ' - ' + this.newEventForm.value.description,
      start: this.fnGetDateFormat(true,obj),
      end: this.fnGetDateFormat(false,obj),
      color: {
        primary: this.color,
        secondary: this.color
      },
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      /*Adding data*/
      id: id,
      actions: this.actions
    };

    this.fecha = null;
    this.timeStart = {hour: 10, minute: 9};
    this.timeEnd = {hour: 11, minute: 9};
    this.color = "#000000";
    this.newEventForm.value.name = "";
    this.newEventForm.value.description = "";

    for( var i = 0; i < this.events.length; i++){ 
    
      if ( this.events[i].id === id) { 
  
          this.events.splice(i, 1); 
      }
    }

    this.events.push(data);
    this.refresh.next();
  
    this.fnUpdateLocalStorage();
    //console.log(id);
    //console.log(event);


  }

  /*
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }*/

}
