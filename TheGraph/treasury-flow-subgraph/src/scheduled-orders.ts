import {
  ExecutionAdded as ExecutionAddedEvent,
  ExecutionStatusUpdated as ExecutionStatusUpdatedEvent,
  ExecutionTriggered as ExecutionTriggeredEvent,
  ExecutionsCancelled as ExecutionsCancelledEvent
} from "../generated/ScheduledOrders/ScheduledOrders"
import {
  ExecutionAdded,
  ExecutionStatusUpdated,
  ExecutionTriggered,
  ExecutionsCancelled
} from "../generated/schema"

export function handleExecutionAdded(event: ExecutionAddedEvent): void {
  let entity = new ExecutionAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.smartAccount = event.params.smartAccount
  entity.jobId = event.params.jobId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExecutionStatusUpdated(
  event: ExecutionStatusUpdatedEvent
): void {
  let entity = new ExecutionStatusUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.smartAccount = event.params.smartAccount
  entity.jobId = event.params.jobId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExecutionTriggered(event: ExecutionTriggeredEvent): void {
  let entity = new ExecutionTriggered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.smartAccount = event.params.smartAccount
  entity.jobId = event.params.jobId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleExecutionsCancelled(
  event: ExecutionsCancelledEvent
): void {
  let entity = new ExecutionsCancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.smartAccount = event.params.smartAccount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
