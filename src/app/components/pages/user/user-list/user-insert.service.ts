import {
    Injectable
} from '@angular/core';
import { NotifyMessageService } from 'src/app/services/notify-message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserListComponent } from './user-list.component';


@Injectable({
    providedIn: 'root'
})

export class UserInsertService {
    
    private _userListComponent: UserListComponent;

    constructor(private notifyMessage: NotifyMessageService) {}

    set userListComponent(value) {
        this._userListComponent = value;
    }

    showModalInsert() {
        this._userListComponent.userNewModel.showModal();
    }

    onInsertSuccess($event: any) {
        this.notifyMessage.success('Usuário cadastrado com sucesso');
        this._userListComponent.getUsers();
    }

    onInsertError($event: HttpErrorResponse) {
        this.notifyMessage.error('Erro ao cadastrar Usuário');
        console.log($event);
    }
}
