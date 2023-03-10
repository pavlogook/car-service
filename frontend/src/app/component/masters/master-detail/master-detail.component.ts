import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Master } from 'src/app/model/master';
import { Order } from 'src/app/model/order';
import { MasterService } from 'src/app/service/master.service';
import { MastersComponent } from '../masters.component';

@Component({
  selector: 'app-master-detail',
  templateUrl: './master-detail.component.html',
  styleUrls: ['./master-detail.component.css']
})
export class MasterDetailComponent implements OnChanges {
  id!: number;
  master!: Master;
  salary!: number;
  orders: Order[] | undefined;
  isMasterChanged: boolean = false;

  constructor(
    private mastersComponent: MastersComponent,
    private masterService: MasterService) { }

  @Input() set masterId(value: number) {
    this.id = value;
    this.isMasterChanged = false;
    this.orders = undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.id != null) {
      this.getMaster();
    }
  }

  getMaster(): void {
    this.masterService.getMaster(this.id)
      .subscribe(master => this.master = master);
  }

  updateMaster(): void {
    const body = {
      name: this.master.name
    }
    this.masterService.updateMaster(this.id, body)
      .subscribe(master => {
        this.master = master;
        this.mastersComponent.updateMasterInList(master);
      });
    this.isMasterChanged = false;
  }

  calculateSalary(): void {
    this.masterService.calculateSalary(this.id)
      .subscribe(salary => this.salary = salary);
  }

  getOrders(): void {
    this.masterService.getOrders(this.id)
      .subscribe(orders => this.orders = orders);
  }

  masterChanged(): void {
    this.isMasterChanged = true;
  }
}
