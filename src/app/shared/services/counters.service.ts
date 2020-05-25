import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountersService {

  constructor(
    private readonly fireStore: AngularFirestore
  ) { }

  public createCounter(ref: DocumentReference, num_shards: number): Promise<void> {
    const batch = this.fireStore.firestore.batch();

    batch.set(ref, { num_shards: num_shards });

    for (let i = 0; i < num_shards; i++) {
      let shardRef = ref.collection('shards').doc(i.toString())
      batch.set(shardRef, { count: 0 })
    }

    return batch.commit();
  }

  public updateCounter(ref: DocumentReference, num_shards: number, val: number): Promise<void> {
    const shard_id = Math.floor(Math.random() * num_shards).toString();
    const shard_ref = ref.collection('shards').doc(shard_id);

    return shard_ref.set({
      'count': firestore.FieldValue.increment(val)
    }, { merge: true });
  }

  public getCount(ref: DocumentReference): Promise<number> {
    const shardsRef = ref.collection('shards').get()

    return shardsRef.then(snapshot => {
      let total_count = 0;

      snapshot.forEach(doc => {
        total_count += doc.data().count;
      });

      return total_count;
    })
  }
}
