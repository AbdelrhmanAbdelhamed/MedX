# MedicalRecords.js

Public functions

1-add(input , inputType) return data[]


input : string or buffer
input type : 's' -> string , 'r' -> buffer


return : data = [{
    encryptionKey: : ,
    cypherText: :  ,
    encryptionMethod: : ,
    hash : ,
    hashType:,
    inputType:
}]


2-retrive(data) return output[]

input : data = [{
    encryptionKey: : ,
    cypherText: :  ,
    encryptionMethod: : ,
    hash : ,
    hashType:,
    inputType:
}]

return : output =[{
            massage :
            data:
        }] 
        
        massage -> success          OR fail
        data    -> string or buffer OR null

