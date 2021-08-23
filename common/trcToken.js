export default class TrcToken {
	constructor(contractAddress, abi = undefined) {
		this.contractAddress = contractAddress
		this.defaultAddress = ''
		this.abi = abi
		this.tronTimeout = null
		this.tronWeb = undefined
		this.getTronWeb()
	}
	/**
	 * 辅助函数，将HEX格式转换为Utf8格式。
	 * @param {Object} value
	 */
	toUtf8(value) {
		return window.tronWeb.toUtf8(value)
		// return this.tronWeb.toUtf8(value)
	}

	/**
	 * 获取钱包地址
	 */
	getDefaultAddress() {
		return window.tronWeb.defaultAddress.base58
		// return this.defaultAddress
	}
	
	/**
	 * 链接钱包
	 */
	getTronWeb() {
		// this.tronTimeout = setInterval(async () => {
		// 	if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
		// 		clearInterval(this.tronTimeout)
		// 		this.tronWeb = window.tronWeb
		// 		this.defaultAddress = window.tronWeb.defaultAddress.base58
		// 		//this.$set(this, 'tronweb', window.tronWeb)
		// 		//this.$set(this, 'walletAddr', window.tronWeb.defaultAddress.base58)
		// 		// let contract = await window.tronWeb.contract().at(this.ndAddr)
		// 		// console.log(contract, contract.transfer)
		// 		// window.tronWeb.trx.getBalance(this.defaultAddress).then(res => {
		// 		// 	console.log(res)
		// 		// })
		// 		// this.onTronWebMessage()
		// 		return Promise.resolve('3232')
		// 	} else {
		// 		uni.showToast({
		// 			title: '链接钱包失败，请登录钱包',
		// 			icon: 'none'
		// 		})
		// 	}
		// }, 2000)
	}
	
	async getBalance() {

		const balance = await window.tronWeb.trx.getBalance(window.tronWeb.defaultAddress.base58)
		return this.fromSun(balance)
		// const balance = await this.tronWeb.trx.getBalance(this.defaultAddress)
		// return this.fromSun(balance)
	} 
	
	async getTokenBalance() {
		const contract = await window.tronWeb.contract().at(this.contractAddress)
		console.log("getTokenBalance:::", contract, this.contractAddress)
		if (this.abi != undefined) {
			contract.loadAbi(this.abi)
		}
		const result = await contract.balanceOf(window.tronWeb.defaultAddress.base58).call()
		console.log(result)
		return this.fromSun(result.balance)
		// const contract = await this.tronWeb.contract().at(this.contractAddress)
		// console.log("getTokenBalance:::", contract, this.contractAddress)
		// if (this.abi != undefined) {
		// 	contract.loadAbi(this.abi)
		// }
		// const result = await contract.balanceOf(this.defaultAddress).call()
		// console.log(result)
		// return this.fromSun(result.balance)
	} 
	
	async getTokenBalanceNew() {
		const contract = await window.tronWeb.contract().at(this.contractAddress)
		console.log("getTokenBalanceNew:::", contract)
		if (this.abi != undefined) {
			contract.loadAbi(this.abi)
		}
		const result = await contract.balanceOf(window.tronWeb.defaultAddress.base58).call({
			_isConstant: true
		})
		console.log(result)
		return this.fromSun(result)
		// const contract = await this.tronWeb.contract().at(this.contractAddress)
		// console.log("getTokenBalanceNew:::", contract)
		// if (this.abi != undefined) {
		// 	contract.loadAbi(this.abi)
		// }
		// const result = await contract.balanceOf(this.defaultAddress).call({
		// 	_isConstant: true
		// })
		// console.log(result)
		// return this.fromSun(result)
	} 
	
	fromSun(value) {
		return window.tronWeb.fromSun(value)
		// return this.tronWeb.fromSun(value)
	} 

	/**
	 * 质押，输入的是代币金额，主要要带精度的，质押之前需要先
	 * function stake(uint256 amount) public
	 * @param {Object} amount
	 */
	async stake(amount) {
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
			}
			const result = contract.stake(window.tronWeb.toSun(amount)).send({
				feeLimit:150000000,
				shouldPollResponse: true
			})
			return result
		} catch (e) {
			return Promise.reject(e)
		}
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 	}
		// 	const result = contract.stake(this.tronWeb.toSun(amount)).send({
		// 		feeLimit:150000000,
		// 		shouldPollResponse: true
		// 	})
		// 	return result
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
	}
	
	/**
	 * 获取当前系统下标--天数
	 * function getCurDayIndex() public view returns (uint256)
	 */
	async getCurDayIndex() {
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
			}
			const result = contract.getCurDayIndex().call({
				shouldPollResponse: true
			})
			return result
		} catch (e) {
			return Promise.reject(e)
		}
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 	}
		// 	const result = contract.getCurDayIndex().call({
		// 		shouldPollResponse: true
		// 	})
		// 	return result
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
	}
	
	/**
	 * 参数，用户地址，天数下标  (内部是计算用户最后一次领取到当前的可领取收益)
	 * 我的出矿  ==>查询该用户累计多少收益未领取 （getBonus方法获取，参数分别是用户地址，和getCurDayIndex获取的下标
	 * @param {Object} address
	 * @param {Object} dayIndex
	 */
	async getBonus(address, dayIndex) {
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
			}
			const result = contract.getBonus(address, dayIndex).call({
				shouldPollResponse: true
			})
			return result
		} catch (e) {
			return Promise.reject(e)
		}
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 	}
		// 	const result = contract.getBonus(address, dayIndex).call({
		// 		shouldPollResponse: true
		// 	})
		// 	return result
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
	}
	
	/**
	 * 收割  ==>点击领取所有未领取收益 (withdrawBonus方法领取，参数dayCount是多少天的意思，该值建议最大50， 如超50，分批次领取)
	 * @param {Object} dayCount
	 */
	async withdrawBonus(dayCount) {
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
				const result = contract.withdraw(dayCount).send({
					shouldPollResponse: true
				})
				return result
			} else {
				const result = contract.withdrawBonus(dayCount).send({
					shouldPollResponse: true
				})
				return result
			}
		} catch (e) {
			return Promise.reject(e)
		}
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 		const result = contract.withdraw(dayCount).send({
		// 			shouldPollResponse: true
		// 		})
		// 		return result
		// 	} else {
		// 		const result = contract.withdrawBonus(dayCount).send({
		// 			shouldPollResponse: true
		// 		})
		// 		return result
		// 	}
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
	}
	
	async withdrawBonusLp(dayCount) {
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
				const result = contract.getReward().send({
					shouldPollResponse: true
				})
				return result
			} else {
				const result = contract.getReward().send({
					shouldPollResponse: true
				})
				return result
			}
		} catch (e) {
			return Promise.reject(e)
		}
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 		const result = contract.getReward().send({
		// 			shouldPollResponse: true
		// 		})
		// 		return result
		// 	} else {
		// 		const result = contract.getReward().send({
		// 			shouldPollResponse: true
		// 		})
		// 		return result
		// 	}
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
	}
	
	/**
	 * 获取某天到某天之间的收益，左闭右开
	 * 我的收割       ==>当前用户历史领取总收益，点击进去后的列表，查询该用户所有领取的记录 (总领取收益，getUser 第三个返回值)
	 * @param {Object} address
	 * @param {Object} startIndex
	 * @param {Object} endIndex
	 */
	async getReceivableBonus(address, startIndex, endIndex) {
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
			}
			const result = contract.getReceivableBonus(address, startIndex, endIndex).call({
				shouldPollResponse: true
			})
			return result
		} catch (e) {
			return Promise.reject(e)
		}
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 	}
		// 	const result = contract.getReceivableBonus(address, startIndex, endIndex).call({
		// 		shouldPollResponse: true
		// 	})
		// 	return result
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
	}
	
	async getUserRewardList(address, startIndex, endIndex) {
		
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
			}
			const result = contract.getUserRewardList(address, startIndex, endIndex).call({
				shouldPollResponse: true
			})
			return result
		} catch (e) {
			return Promise.reject(e)
		}
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 	}
		// 	const result = contract.getUserRewardList(address, startIndex, endIndex).call({
		// 		shouldPollResponse: true
		// 	})
		// 	return result
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
	}
	
	/**
	 * 是否有投资过， 用户总质押， 累计已提收益，用户最后操作的时间戳，用户结算收益天数的0点时间戳
	 * @param {Object} address
	 */
	async getUser(address) {
		
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			console.log(888888)
			if (this.abi != undefined) {
				console.log(9999)
				contract.loadAbi(this.abi)
				const result = contract.getUser(address).call({
					_isConstant: true
				})
				return result
			} else {
				console.log(7777)
				const result = contract.getUser(address).call({
					shouldPollResponse: true
				})
				
				return result
			}
			
		} catch (e) {
			return Promise.reject(e)
		}
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	console.log(888888)
		// 	if (this.abi != undefined) {
		// 		console.log(9999)
		// 		contract.loadAbi(this.abi)
		// 		const result = contract.getUser(address).call({
		// 			_isConstant: true
		// 		})
		// 		return result
		// 	} else {
		// 		console.log(7777)
		// 		const result = contract.getUser(address).call({
		// 			shouldPollResponse: true
		// 		})
				
		// 		return result
		// 	}
			
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
	}
		
	async getUserOrder(address, startIndex, endIndex) {
		
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
			}
			const result = contract.getUserOrder(address, startIndex, endIndex).call({
				shouldPollResponse: true
			})
			return result
		} catch (e) {
			return Promise.reject(e)
		}
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 	}
		// 	const result = contract.getUserOrder(address, startIndex, endIndex).call({
		// 		shouldPollResponse: true
		// 	})
		// 	return result
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
	}
	
	/**
	 * 获取系统信息
	 * 当前总质押量,当天产出，当天第几天，开始时间,全网矿工数量
	 */
	async getSysInfo() {
		
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
			}
			const result = contract.getSysInfo().call({
				shouldPollResponse: true
			})
			return result
		} catch (e) {
			return Promise.reject(e)
		}
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 	}
		// 	const result = contract.getSysInfo().call({
		// 		shouldPollResponse: true
		// 	})
		// 	return result
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
	}
	
	/**
	 * 获取授权信息
	 */
	async allowance(address, contractAddress) {
		
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			console.log(this.abi)
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
				const result = await contract.allowance(address, contractAddress).call({
					_isConstant: true
				})
				console.log(result)
				if (result == 0) {
					return {"remaining": 0}
				} else {
					return {"remaining": result}
				}
			} else {
				const result = contract.allowance(address, contractAddress).call({
					shouldPollResponse: true
				})
				return result
			}
		} catch (e) {
			return Promise.reject(e)
		}
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	console.log(this.abi)
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 		const result = await contract.allowance(address, contractAddress).call({
		// 			_isConstant: true
		// 		})
		// 		console.log(result)
		// 		if (result == 0) {
		// 			return {"remaining": 0}
		// 		} else {
		// 			return {"remaining": result}
		// 		}
		// 	} else {
		// 		const result = contract.allowance(address, contractAddress).call({
		// 			shouldPollResponse: true
		// 		})
		// 		return result
		// 	}
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
	}
	
	/**
	 * 授权
	 */
	async approve(contractAddress) {
		
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			const num = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
			// const num = '0x0'
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
				const hash = await contract.approve(contractAddress, num).send({
					shouldPollResponse: true
				});
				return hash
			} else {
				const hash = contract.approve(contractAddress, num).send({
					shouldPollResponse: true,
				});
				console.log(hash)
				return hash
			}
		} catch (e) {
			return Promise.reject(e)
		}
		return false
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	const num = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
		// 	// const num = '0x0'
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 		const hash = await contract.approve(contractAddress, num).send({
		// 			shouldPollResponse: true
		// 		});
		// 		return hash
		// 	} else {
		// 		const hash = contract.approve(contractAddress, num).send({
		// 			shouldPollResponse: true,
		// 		});
		// 		console.log(hash)
		// 		return hash
		// 	}
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
		// return false
	}
	
	// 全部撤出
	async Exit() {
		
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
				const hash = await contract.exit().send({
					shouldPollResponse: true
				});
				return hash
			} else {
				const hash = contract.exit().send({
					shouldPollResponse: true,
				});
				console.log(hash)
				return hash
			}
		} catch (e) {
			return Promise.reject(e)
		}
		return false
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 		const hash = await contract.exit().send({
		// 			shouldPollResponse: true
		// 		});
		// 		return hash
		// 	} else {
		// 		const hash = contract.exit().send({
		// 			shouldPollResponse: true,
		// 		});
		// 		console.log(hash)
		// 		return hash
		// 	}
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
		// return false
	}
	
	// 撤出
	async withdraw(amount) {
		
		try {
			const contract = await window.tronWeb.contract().at(this.contractAddress)
			if (this.abi != undefined) {
				contract.loadAbi(this.abi)
				const hash = await contract.withdraw(window.tronWeb.toSun(amount)).send({
					shouldPollResponse: true
				});
				return hash
			} else {
				const hash = await contract.withdraw(window.tronWeb.toSun(amount)).send({
					shouldPollResponse: true
				});
				console.log(hash)
				return hash
			}
		} catch (e) {
			return Promise.reject(e)
		}
		return false
		// try {
		// 	const contract = await this.tronWeb.contract().at(this.contractAddress)
		// 	if (this.abi != undefined) {
		// 		contract.loadAbi(this.abi)
		// 		const hash = await contract.withdraw(this.tronWeb.toSun(amount)).send({
		// 			shouldPollResponse: true
		// 		});
		// 		return hash
		// 	} else {
		// 		const hash = await contract.withdraw(this.tronWeb.toSun(amount)).send({
		// 			shouldPollResponse: true
		// 		});
		// 		console.log(hash)
		// 		return hash
		// 	}
		// } catch (e) {
		// 	return Promise.reject(e)
		// }
		// return false
	}
	
	async validCount() {
		
		const contract = await window.tronWeb.contract().at(this.contractAddress)
		if (this.abi != undefined) {
			contract.loadAbi(this.abi)
		}
		const result = await contract.validCount().call({
			_isConstant: true
		})
		console.log(result)
		return result
		// const contract = await this.tronWeb.contract().at(this.contractAddress)
		// if (this.abi != undefined) {
		// 	contract.loadAbi(this.abi)
		// }
		// const result = await contract.validCount().call({
		// 	_isConstant: true
		// })
		// console.log(result)
		// return result
	}
	
	async totalSupply() {
		
		const contract = await window.tronWeb.contract().at(this.contractAddress)
		if (this.abi != undefined) {
			contract.loadAbi(this.abi)
		}
		const result = await contract.totalSupply().call({
			_isConstant: true
		})
		console.log(result)
		return result
		// const contract = await this.tronWeb.contract().at(this.contractAddress)
		// if (this.abi != undefined) {
		// 	contract.loadAbi(this.abi)
		// }
		// const result = await contract.totalSupply().call({
		// 	_isConstant: true
		// })
		// console.log(result)
		// return result
	}
	
	async earned(address) {
		
		const contract = await window.tronWeb.contract().at(this.contractAddress)
		if (this.abi != undefined) {
			contract.loadAbi(this.abi)
		}
		const result = await contract.earned(address).call({
			_isConstant: true
		})
		console.log(result)
		return result
		// const contract = await this.tronWeb.contract().at(this.contractAddress)
		// if (this.abi != undefined) {
		// 	contract.loadAbi(this.abi)
		// }
		// const result = await contract.earned(address).call({
		// 	_isConstant: true
		// })
		// console.log(result)
		// return result
	}
	
	async syncDeposit(amount) {
		
		const contract = await window.tronWeb.contract().at(this.contractAddress)
		if (this.abi != undefined) {
			contract.loadAbi(this.abi)
		}
		const result = await contract.sync().send({
			shouldPollResponse: true
		});
		console.log(result)
		return result
		// const contract = await this.tronWeb.contract().at(this.contractAddress)
		// if (this.abi != undefined) {
		// 	contract.loadAbi(this.abi)
		// }
		// const result = await contract.sync().send({
		// 	shouldPollResponse: true
		// });
		// console.log(result)
		// return result
	}
}
