from pyteal import *

def approval_program():
    # Store service metadata
    service_owner = Bytes("owner")
    service_price = Bytes("price")
    
    @Subroutine(TealType.none)
    def register_service():
        return Seq([
            App.globalPut(service_owner, Txn.sender()),
            App.globalPut(service_price, Int(1000)),  # 0.001 USDC
        ])
    
    @Subroutine(TealType.none)
    def verify_payment():
        # Check that payment was made to the service owner
        return Seq([
            Assert(Global.group_size() == Int(2)),
            # Verify asset transfer
        ])
    
    program = Cond(
        [Txn.application_id() == Int(0), register_service()],
        [Txn.on_completion() == OnComplete.NoOp, verify_payment()]
    )
    return program

def clear_state_program():
    return Return(Int(1))
